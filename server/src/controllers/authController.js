import jwt from "jsonwebtoken";

import authService from "../services/authService.js";

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await authService.handleRegister(req.body);

        return res.status(data.status).json({
            message: data.message,
            access_token: data.access_token,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

let login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await authService.handleLogin(email, password);

        res.cookie("jwt", data.access_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(data.status).json({
            message: data.message,
            access_token: data.access_token,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export const handleAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) res.sendStatus(403);
        next();
    });
};

export default { register, login };
