import bcrypt from "bcrypt";

import pool from "../configs/connectDB.js";

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

export default { register, login };
