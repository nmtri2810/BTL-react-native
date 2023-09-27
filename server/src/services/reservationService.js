import pool from "../configs/connectDB.js";
import { pagination } from "../controllers/paginationController.js";

const handleGetReservations = async (userId, status, page, limit) => {
    try {
        let reservations;
        if (userId === "all") {
            if (page && limit && status && status !== "all") {
                reservations = await pagination(+page, +limit, "reservations", "desc", status);
            } else {
                reservations = await pagination(+page, +limit, "reservations", "desc");
            }
        } else if (userId && userId !== "all") {
            const [rows, fields] = await pool.execute("SELECT * FROM reservations where user_id = ? order by id", [userId]);
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

const handleCreateReservation = async (reservationTime, numOfPeople, name, phoneNum, email, notes) => {
    try {
        let user = await checkUserEmailFromDB(email);

        if (user) {
            await pool.execute("INSERT INTO reservations(reservation_time, num_of_people, name, phone_num, email, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                reservationTime,
                numOfPeople,
                name,
                phoneNum,
                email,
                notes,
                user.id,
            ]);

            const [rows, fields] = await pool.execute(
                "select reservations.* from reservations join users on reservations.user_id = users.id where reservations.user_id = ? order by reservations.id desc limit 1",
                [user.id]
            );

            return {
                status: 201,
                message: "Ok",
                reservation: rows[0],
            };
        } else {
            return {
                status: 401,
                message: "User not exist",
            };
        }
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateStatus = async (reservationId, statusId) => {
    try {
        await pool.execute(`UPDATE reservations SET status_id = ? WHERE id = ?`, [statusId, reservationId]);

        return {
            status: 200,
            message: "Updated",
        };
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

export default { handleGetReservations, handleCreateReservation, handleUpdateStatus };
