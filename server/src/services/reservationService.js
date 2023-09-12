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
                "SELECT * FROM reservations where user_id = ? order by id desc",
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
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const handleCreateReservation = async (
    reservationTime,
    numOfPeople,
    notes,
    email
) => {
    try {
        let user = await checkUserEmailFromDB(email);

        await pool.execute(
            "INSERT INTO reservations(reservation_time, num_of_people, notes, user_id) VALUES (?, ?, ?, ?)",
            [reservationTime, numOfPeople, notes, user.id]
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

export default { handleGetReservations, handleCreateReservation };
