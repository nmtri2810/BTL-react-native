import express from "express";

import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import reservationController from "../controllers/reservationController.js";

const router = express.Router();

const initApiRoute = (app) => {
    router.post("/register", authController.register);
    router.post("/login", authController.login);

    router.get("/users", userController.getUsers);
    router.post("/create-user", userController.createUser);
    router.put("/update-user", userController.updateUser);
    router.delete("/detele-user", userController.deleteUser);

    router.get("/reservations", reservationController.getReservations);
    router.post("/create-reservation", reservationController.createReservation);

    return app.use("/api/", router);
};

export default initApiRoute;
