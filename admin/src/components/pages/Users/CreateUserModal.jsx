import { Modal } from "flowbite-react";
import { useState } from "react";

import axios from "../../../api/customAxios";

const CreateUserModal = ({ onUserCreated }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        name: "",
        phoneNum: "",
        role: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleCreateUser = async () => {
        //validate...
        try {
            await axios.post("create-user", {
                ...userInput,
            });
            alert("Create user successfully");
            setUserInput({
                email: "",
                password: "",
                name: "",
                phoneNum: "",
                role: "",
            });
            onUserCreated();
            props.setOpenModal(undefined);
        } catch (error) {
            if (!error?.response) {
                alert("No server response");
            } else if (error.response.status === 400) {
                alert("Missing required parameter");
            } else if (error.response.status === 409) {
                alert("User already exist");
            } else {
                alert("Create user failed");
            }
        }
    };

    return (
        <>
            <button
                onClick={() => props.setOpenModal("dismissible")}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-2"
            >
                <i className="fa-solid fa-plus mr-2"></i>
                Create new user
            </button>
            <Modal
                dismissible
                size="2xl"
                show={props.openModal === "dismissible"}
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header>CREATE NEW USER</Modal.Header>
                <Modal.Body>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="email@company.com"
                                required
                                value={userInput.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="••••••••"
                                required
                                value={userInput.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="John Doe"
                                required
                                value={userInput.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="phoneNum"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Phone number
                            </label>
                            <input
                                type="tel"
                                name="phoneNum"
                                id="phoneNum"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="0123456789"
                                required
                                value={userInput.phoneNum}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Role
                            </label>
                            <select
                                name="role"
                                id="role"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                value={userInput.role}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden>
                                    Select role
                                </option>
                                <option value="AD">Admin</option>
                                <option value="MA">Manager</option>
                                <option value="US">User</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleCreateUser}
                    >
                        Create
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateUserModal;
