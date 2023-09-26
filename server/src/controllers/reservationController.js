import reservationService from "../services/reservationService.js";

const getReservations = async (req, res) => {
    try {
        const userId = req.query.id; //all || id
        const status = req.query.status;

        if (!userId) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await reservationService.handleGetReservations(userId, status);

        return res.status(data.status).json({
            message: data.message,
            reservations: data.reservations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const createReservation = async (req, res) => {
    try {
        const { reservationTime, numOfPeople, name, phoneNum, email, notes } = req.body;

        if (!reservationTime || !numOfPeople || !name || !phoneNum || !email || !notes) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await reservationService.handleCreateReservation(reservationTime, numOfPeople, name, phoneNum, email, notes);

        return res.status(data.status).json({
            message: data.message,
            reservation: data.reservation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default {
    getReservations,
    createReservation,
};
