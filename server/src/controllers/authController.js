import authService from "../services/authService.js";

//add jwt authentication for register
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
            // access_token: data.access_token,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await authService.handleLogin(email, password);

        res.cookie("jwt", data.refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true,
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

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (refreshToken == null) return res.sendStatus(204);

        await authService.handleLogout(refreshToken);

        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default { register, login, logout };
