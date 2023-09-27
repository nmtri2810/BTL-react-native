import express from "express";

import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import reservationController from "../controllers/reservationController.js";
import { handleAuthenticateToken } from "../middlewares/verifyJWT.js";
import refreshTokenController from "../controllers/refreshTokenController.js";
import sendInfo from "../controllers/sendInfoController.js";

const router = express.Router();

const initApiRoute = (app) => {
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.post("/logout", authController.logout);

    router.get("/refresh", refreshTokenController.refreshToken);

    router.get("/users", handleAuthenticateToken, userController.getUsers);
    router.post("/create-user", userController.createUser);
    router.put("/update-user", userController.updateUser);
    router.delete("/detele-user", userController.deleteUser);

    router.get("/reservations", handleAuthenticateToken, reservationController.getReservations);
    router.post("/create-reservation", reservationController.createReservation);
    router.put("/update-status", reservationController.updateStatus);

    router.post("/send-info", sendInfo);

    return app.use("/api/", router);
};

export default initApiRoute;
