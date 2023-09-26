import jwt from "jsonwebtoken";

import pool from "../configs/connectDB.js";

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (refreshToken == null) return res.sendStatus(401);

        const [rows, fields] = await pool.execute("SELECT * FROM refresh_tokens where refresh_token = ?", [refreshToken]);

        if (!rows[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);

            const [rows, fields] = await pool.execute("SELECT email FROM users where id = ?", [decoded.user.id]);

            const accessToken = jwt.sign(
                {
                    user: {
                        id: decoded.user.id,
                        role_id: decoded.user.role_id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "30s",
                }
            );
            res.json({
                email: rows[0].email,
                role_id: decoded.user.role_id,
                access_token: accessToken,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default { refreshToken };
