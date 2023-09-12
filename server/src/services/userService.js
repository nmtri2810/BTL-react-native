import bcrypt from "bcrypt";

import pool from "../configs/connectDB.js";

const handleGetUsers = async (id) => {
    try {
        let users;
        if (id === "all") {
            const [rows, fields] = await pool.execute("SELECT * FROM users");
            users = rows;
            for (let user in users) {
                if (users[user].hasOwnProperty("password")) {
                    delete users[user].password;
                }
            }
        } else if (id && id !== "all") {
            const [rows, fields] = await pool.execute(
                "SELECT * FROM users where id = ?",
                [id]
            );
            users = rows[0];
            delete users.password;
        }

        return {
            status: 200,
            message: "Ok",
            users,
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const handleCreateUser = async (email, password, name, phoneNum) => {
    try {
        let user = await checkUserEmailFromDB(email);

        if (user) {
            return {
                status: 409,
                message: "User already exist",
            };
        } else {
            const hashPassword = await hashUserPassword(password);

            await pool.execute(
                "INSERT INTO users(email, password, name, phone_num) VALUES (?, ?, ?, ?)",
                [email, hashPassword, name, phoneNum]
            );

            user = await checkUserEmailFromDB(email);

            return {
                status: 201,
                message: "Ok",
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

const handleUpdateUser = async (name, phoneNum, email) => {
    try {
        await pool.execute(
            "update users set name = ?, phone_num = ? where email = ?",
            [name, phoneNum, email]
        );

        let user = await checkUserEmailFromDB(email);

        if (!user) {
            return {
                status: 401,
                message: "User not exist",
            };
        } else {
            delete user.password;

            return {
                status: 200,
                message: "Ok",
                user: user,
            };
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const handleDeleteUser = async (id) => {
    try {
        const [rows, fields] = await pool.execute(
            "SELECT * FROM users where id = ?",
            [id]
        );

        if (!rows[0]) {
            return {
                status: 401,
                message: "User not exist",
            };
        } else {
            await pool.execute("delete from users where id= ? ", [id]);

            return {
                status: 200,
                message: "User deleted",
            };
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
    handleGetUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
