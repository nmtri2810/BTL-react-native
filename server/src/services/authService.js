import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../configs/connectDB.js";

const handleRegister = async (data) => {
    try {
        let user = await checkUserEmailFromDB(data.email);

        if (user) {
            return {
                status: 409,
                message: "User already exist",
            };
        } else {
            const hashPassword = await hashUserPassword(data.password);

            await pool.execute(
                "INSERT INTO users(email, password) VALUES (?, ?)",
                [data.email, hashPassword]
            );

            user = await checkUserEmailFromDB(data.email);

            let accessToken = jwt.sign(
                { userId: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "7d",
                }
            );

            return {
                status: 201,
                message: "Ok",
                access_token: accessToken,
                user_id: user.id,
            };
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const handleLogin = async (email, password) => {
    try {
        let user = await checkUserEmailFromDB(email);

        if (!user) {
            return {
                status: 401,
                message: "User not exist",
            };
        } else {
            let checkPassword = bcrypt.compareSync(password, user.password);

            if (!checkPassword) {
                return {
                    status: 401,
                    message: "Wrong password",
                };
            } else {
                let accessToken = jwt.sign(
                    { userId: user.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                return {
                    status: 200,
                    message: "Ok",
                    access_token: accessToken,
                    user_id: user.id,
                };
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const checkUserEmailFromDB = async (email) => {
    try {
        const [rows, fields] = await pool.execute(
            "SELECT * FROM users where email = ?",
            [email]
        );

        const user = rows[0];

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const hashUserPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(+process.env.PASSWORD_SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default {
    handleRegister,
    handleLogin,
};
