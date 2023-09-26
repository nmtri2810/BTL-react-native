import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

import axios from "../../../api/customAxios";

const EditUserModal = ({ email, name, phoneNum, role, onUserEdit }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const [userInput, setUserInput] = useState({
        email: "",
        name: "",
        phoneNum: "",
        role: "",
    });

    useEffect(() => {
        setUserInput({
            email: email,
            name: name ? name : "",
            phoneNum: phoneNum ? phoneNum : "",
            role: role,
        });
    }, [email, name, phoneNum, role]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleEditUser = async () => {
        //validate
        try {
            await axios.put("update-user", {
                ...userInput,
            });
            alert("Edit user successfully");
            onUserEdit();
            props.setOpenModal(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button onClick={() => props.setOpenModal("dismissible")} className="font-medium text-primary-600 hover:underline">
                Edit
            </button>
            <Modal dismissible size="2xl" show={props.openModal === "dismissible"} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>EDIT USER</Modal.Header>
                <Modal.Body>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="form-group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="email@company.com"
                                required
                                value={email}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <label htmlFor="phoneNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        onClick={handleEditUser}
                    >
                        Edit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditUserModal;
