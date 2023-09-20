import { Button, Modal } from "flowbite-react";
import { useState } from "react";

import axios from "../../../api/customAxios";

const DeleteUserModal = ({ userId, email, onUserDelete }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    // need error handling for constraints in DB
    const handleDeleteUser = async () => {
        try {
            await axios.delete(`detele-user?id=${userId}`);
            alert("Delete user successfully");
            onUserDelete();
            props.setOpenModal(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                onClick={() => props.setOpenModal("pop-up")}
                className="font-medium text-red-600 hover:underline ml-3"
            >
                Delete
            </button>
            <Modal
                show={props.openModal === "pop-up"}
                size="md"
                dismissible
                popup
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <i className="fa-solid fa-circle-exclamation text-5xl mb-4 text-gray-400 dark:text-gray-200"></i>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete the user with email{" "}
                            <span className="text-black font-bold">
                                {email}?
                            </span>
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => props.setOpenModal(undefined)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteUserModal;
