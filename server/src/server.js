import express from "express";
import initApiRoute from "./route/api.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//init api route
initApiRoute(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
