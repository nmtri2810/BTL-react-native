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
            user_id: data.user_id,
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

        return res.status(data.status).json({
            message: data.message,
            access_token: data.access_token,
            user_id: data.user_id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default { register, login };
