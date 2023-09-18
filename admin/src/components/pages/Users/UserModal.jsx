import React, { useState } from "react";

import axios from "../../../api/customAxios";

const UserModal = ({ isVisible, onClose }) => {
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
            onClose();
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

    //logic for open and close modal
    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };
    if (!isVisible) return null;

    return (
        <div
            id="wrapper"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/30"
            onClick={handleClose}
        >
            <div className="relative w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            CREATE NEW USER
                        </h3>
                        <button
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => onClose()}
                        >
                            <i className="fa-solid fa-x text-lg"></i>
                        </button>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
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
                        <div className="flex justify-end items-end">
                            <button
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleCreateUser}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
