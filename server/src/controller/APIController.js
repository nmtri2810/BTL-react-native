import pool from "../configs/connectDB.js";

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM user');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let getUser = async (req, res) => {
    let email = req.params.email
    const [rows, fields] = await pool.execute('SELECT * FROM user where email = ?', [email]);

    return res.status(200).json({
        data: rows[0]
    })
}

let signUp = async (req, res) => {
    let { email, password } = req.body

    if( !email || !password ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('INSERT INTO user(email, password) VALUES (?, ?)', 
        [email, password])

    const [rows, fields] = await pool.execute('SELECT * FROM user where email = ?',
        [email]);

    return res.status(200).json({
        data: rows[0]
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body

    if( !firstName || !lastName || !email || !address || !id ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update user set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
    [firstName, lastName, email, address, id])

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id

    if(!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('DELETE FROM user WHERE id = ?', [userId])

    return res.status(200).json({
        message: 'ok'
    })
}

export default {
    getAllUser,
    getUser,
    signUp,
    updateUser,
    deleteUser
}