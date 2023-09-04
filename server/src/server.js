import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

import initApiRoute from "./routes/api.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
        origin: true,
    })
);

//init api route
initApiRoute(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
