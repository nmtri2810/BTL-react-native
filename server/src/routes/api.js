import express from "express";

import userController from "../controller/userController.js";
import authController from "../controller/authController.js";
import reservationController from "../controller/reservationController.js";

let router = express.Router();

const initApiRoute = (app) => {
    router.post("/register", authController.register);
    router.post("/login", authController.login);

    router.get("/users", userController.getAllUser);
    router.get("/users/:email", userController.getUser);
    router.put("/update-user", userController.updateUser);

    router.get("/reservation", reservationController.getAllReservation);
    router.get(
        "/reservation/:email",
        reservationController.getReservationByEmail
    );
    router.post("/reservate", reservationController.reservate);

    return app.use("/api/", router);
};

export default initApiRoute;
