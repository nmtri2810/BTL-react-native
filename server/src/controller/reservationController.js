import pool from "../configs/connectDB.js";

let getAllReservation = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM reservation");

    return res.status(200).json({
        message: "ok",
        data: rows,
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

export default {
    getAllReservation,
    getReservationByEmail,
    reservate,
};
