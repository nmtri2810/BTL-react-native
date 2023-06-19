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

let register = async (req, res) => {
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

let login = async (req, res) => {
    let { email, password } = req.body

    if( !email || !password ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    const [rows, fields] = await pool.execute('SELECT * FROM user where email = ? and password = ?',
        [email, password]);

    console.log(rows[0])

    return res.status(200).json({
        data: rows[0]
    })
}

let reservate = async (req, res) => {
    let { reservationTime, numOfPeople, notes, email } = req.body

    if( !reservationTime || !numOfPeople || !notes || !email ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('INSERT INTO reservation(reservation_time, num_of_people, notes, email) VALUES (?, ?, ?, ?)', 
        [reservationTime, numOfPeople, notes, email])

    const [rows, fields] = await pool.execute('select reservation.* from reservation join user on reservation.email = user.email where reservation.email = ? order by reservation.id desc limit 1',
        [email]);

    return res.status(200).json({
        data: rows[0]
    })
}

let updateUser = async (req, res) => {
    let { name, phoneNum, email } = req.body

    if( !name || !phoneNum || !email ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update user set name = ?, phone_num = ? where email = ?', 
    [name, phoneNum, email])

    const [rows, fields] = await pool.execute('SELECT * FROM user where email = ?',
    [email]);

    return res.status(200).json({
        data: rows[0]
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
    register,
    login,
    reservate,
    updateUser,
    deleteUser
}