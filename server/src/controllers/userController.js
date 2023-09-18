import userService from "../services/userService.js";

const getUsers = async (req, res) => {
    try {
        const id = req.query.id; //all || id

        if (!id) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await userService.handleGetUsers(id);

        return res.status(data.status).json({
            message: data.message,
            users: data.users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, name, phoneNum, role } = req.body;

        if (!email || !password || !name || !phoneNum || !role) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await userService.handleCreateUser(
            email,
            password,
            name,
            phoneNum,
            role
        );

        return res.status(data.status).json({
            message: data.message,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

//update user by email
const updateUser = async (req, res) => {
    try {
        const { name, phoneNum, email } = req.body;

        if (!name || !phoneNum || !email) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await userService.handleUpdateUser(name, phoneNum, email);

        return res.status(data.status).json({
            message: data.message,
            user: data.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.body.id;

        if (!id) {
            return res.status(400).json({
                message: "Missing required parameter",
            });
        }

        const data = await userService.handleDeleteUser(id);

        return res.status(data.status).json({
            message: data.message,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error from server",
        });
    }
};

export default { getUsers, createUser, updateUser, deleteUser };
