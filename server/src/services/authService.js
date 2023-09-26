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

            await pool.execute("INSERT INTO users(email, password) VALUES (?, ?)", [data.email, hashPassword]);

            user = await checkUserEmailFromDB(data.email);

            // let accessToken = jwt.sign(
            //     { user: user.email },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     {
            //         expiresIn: "7d",
            //     }
            // );

            user = { id: user.id, role_id: user.role_id };

            return {
                status: 201,
                message: "Ok",
                // access_token: accessToken,
                user: user,
            };
        }
    } catch (error) {
        console.log(error);
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
                user = { id: user.id, role_id: user.role_id };
                let accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "30s",
                });
                let refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: "1d",
                });

                //store in DB ?
                await pool.execute("INSERT INTO refresh_tokens(refresh_token, user_id) VALUES (?, ?)", [refreshToken, user.id]);

                return {
                    status: 200,
                    message: "Ok",
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user: user,
                };
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const handleLogout = async (refreshToken) => {
    try {
        const [rows, fields] = await pool.execute("SELECT * FROM refresh_tokens where refresh_token = ?", [refreshToken]);

        if (rows[0]) {
            await pool.execute("delete from refresh_tokens where refresh_token = ? ", [refreshToken]);
        }

        return;
    } catch (error) {
        console.log(error);
    }
};

const checkUserEmailFromDB = async (email) => {
    try {
        const [rows, fields] = await pool.execute("SELECT * FROM users where email = ?", [email]);

        const user = rows[0];

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

const hashUserPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(+process.env.PASSWORD_SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
};

export default {
    handleRegister,
    handleLogin,
    handleLogout,
};
