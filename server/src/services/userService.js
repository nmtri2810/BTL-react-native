import bcrypt from "bcrypt";

import pool from "../configs/connectDB.js";
import { pagination } from "../controllers/paginationController.js";

const handleGetUsers = async (id, page, limit, sortValue) => {
    try {
        let users;
        if (id === "all") {
            if (page && limit && sortValue) {
                users = await pagination(+page, +limit, "users", sortValue);

                removeUserPassword(users.data);
            } else {
                const [rows, fields] = await pool.execute("SELECT * FROM users");
                users = rows;

                removeUserPassword(users);
            }
        } else if (id && id !== "all") {
            const [rows, fields] = await pool.execute("SELECT * FROM users where id = ?", [id]);
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
    }
};

const handleCreateUser = async (email, password, name, phoneNum, role) => {
    try {
        let user = await checkUserEmailFromDB(email);

        if (user) {
            return {
                status: 409,
                message: "User already exist",
            };
        } else {
            const hashPassword = await hashUserPassword(password);

            await pool.execute("INSERT INTO users(email, password, name, phone_num, role_id) VALUES (?, ?, ?, ?, ?)", [email, hashPassword, name, phoneNum, role]);

            user = await checkUserEmailFromDB(email);
            delete user.password;

            return {
                status: 201,
                message: "Ok",
                user: user,
            };
        }
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateUser = async (name, phoneNum, email, role) => {
    try {
        await pool.execute("update users set name = ?, phone_num = ?, role_id = ? where email = ?", [name, phoneNum, role, email]);

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
    }
};

const handleDeleteUser = async (id) => {
    try {
        const [rows, fields] = await pool.execute("SELECT * FROM users where id = ?", [id]);

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

const removeUserPassword = async (userList) => {
    for (let user in userList) {
        if (userList[user].hasOwnProperty("password")) {
            delete userList[user].password;
        }
    }
};

export default {
    handleGetUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
};
