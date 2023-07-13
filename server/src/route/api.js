import express from "express";
import APIController from "../controller/APIController.js";

let router = express.Router();

const initApiRoute = (app) => {
    router.get("/users", APIController.getAllUser);
    router.get("/reservation", APIController.getAllReservation);
    router.get("/users/:email", APIController.getUser);
    router.get("/reservation/:email", APIController.getReservationByEmail);
    router.post("/register", APIController.register);
    router.post("/login", APIController.login);
    router.post("/reservate", APIController.reservate);
    router.put("/update-user", APIController.updateUser);

    return app.use("/api/", router);
};

export default initApiRoute;
