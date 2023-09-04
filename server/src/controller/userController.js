import pool from "../configs/connectDB.js";

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM user");

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

export default { getAllUser, getUser, updateUser };
