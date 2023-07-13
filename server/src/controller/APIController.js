import pool from "../configs/connectDB.js";
import bcrypt from "bcrypt";

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM user");

    return res.status(200).json({
        message: "ok",
        data: rows,
    });
};

let getAllReservation = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM reservation");

    return res.status(200).json({
        message: "ok",
        data: rows,
    });
};

let getUser = async (req, res) => {
    let email = req.params.email;

    const [rows, fields] = await pool.execute(
        "SELECT * FROM user where email = ?",
        [email]
    );

    return res.status(200).json({
        data: rows[0],
    });
};

let getReservationByEmail = async (req, res) => {
    let email = req.params.email;
    const [rows, fields] = await pool.execute(
        "SELECT * FROM reservation where email = ? order by id desc",
        [email]
    );

    return res.status(200).json({
        data: rows,
    });
};

let register = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required params",
        });
    }

    let [rows, fields] = await pool.execute(
        "SELECT * FROM user where email = ?",
        [email]
    );

    const user = rows[0];
    if (!user) {
        const hash = await bcrypt.hash(password, 13);
        await pool.execute("INSERT INTO user(email, password) VALUES (?, ?)", [
            email,
            hash,
        ]);

        [rows, fields] = await pool.execute(
            "SELECT * FROM user where email = ?",
            [email]
        );

        return res.status(200).json({
            data: rows[0],
        });
    } else {
        return res.status(403).json({
            message: "User already exists",
        });
    }
};

let login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "missing required params",
        });
    }

    const [rows, fields] = await pool.execute(
        "SELECT * FROM user where email = ?",
        [email]
    );

    const user = rows[0];
    if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return res.status(200).json({
                data: rows[0],
            });
        } else {
            return res.status(401).json({
                message: "Wrong password",
            });
        }
    } else {
        return res.status(401).json({
            message: "User not exist",
        });
    }
};

let reservate = async (req, res) => {
    let { reservationTime, numOfPeople, notes, email } = req.body;

    if (!reservationTime || !numOfPeople || !notes || !email) {
        return res.status(400).json({
            message: "missing required params",
        });
    }

    await pool.execute(
        "INSERT INTO reservation(reservation_time, num_of_people, notes, email) VALUES (?, ?, ?, ?)",
        [reservationTime, numOfPeople, notes, email]
    );

    const [rows, fields] = await pool.execute(
        "select reservation.* from reservation join user on reservation.email = user.email where reservation.email = ? order by reservation.id desc limit 1",
        [email]
    );

    return res.status(200).json({
        data: rows[0],
    });
};

let updateUser = async (req, res) => {
    let { name, phoneNum, email } = req.body;

    if (!name || !phoneNum || !email) {
        return res.status(400).json({
            message: "missing required params",
        });
    }

    await pool.execute(
        "update user set name = ?, phone_num = ? where email = ?",
        [name, phoneNum, email]
    );

    const [rows, fields] = await pool.execute(
        "SELECT * FROM user where email = ?",
        [email]
    );

    return res.status(200).json({
        data: rows[0],
    });
};

export default {
    getAllUser,
    getAllReservation,
    getUser,
    getReservationByEmail,
    register,
    login,
    reservate,
    updateUser,
};
