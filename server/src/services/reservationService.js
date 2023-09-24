import pool from "../configs/connectDB.js";

const handleGetReservations = async (userId) => {
    try {
        let reservations;
        if (userId === "all") {
            const [rows, fields] = await pool.execute(
                "SELECT * FROM reservations"
            );
            reservations = rows;
        } else if (userId && userId !== "all") {
            const [rows, fields] = await pool.execute(
                "SELECT * FROM reservations where user_id = ? order by id",
                [userId]
            );
            reservations = rows;
        }

        return {
            status: 200,
            message: "Ok",
            reservations,
        };
    } catch (error) {
        console.log(error);
    }
};

const handleCreateReservation = async (
    reservationTime,
    numOfPeople,
    name,
    phoneNum,
    email,
    notes
) => {
    try {
        let user = await checkUserEmailFromDB(email);

        await pool.execute(
            "INSERT INTO reservations(reservation_time, num_of_people, name, phone_num, email, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                reservationTime,
                numOfPeople,
                name,
                phoneNum,
                email,
                notes,
                user.id,
            ]
        );

        const [rows, fields] = await pool.execute(
            "select reservations.* from reservations join users on reservations.user_id = users.id where reservations.user_id = ? order by reservations.id desc limit 1",
            [user.id]
        );

        return {
            status: 201,
            message: "Ok",
            reservation: rows[0],
        };
    } catch (error) {
        console.log(error);
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
    }
};

export default { handleGetReservations, handleCreateReservation };
