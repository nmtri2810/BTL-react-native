import { Button, Modal } from "flowbite-react";
import { useState } from "react";

import axios from "../../../api/customAxios";

const ConfirmReservationModal = ({ email, phoneNum, name, reservationTime, numOfPeople, notes, onConfirmed }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const handleSendEmailAndMessage = async () => {
        try {
            await axios.post("send-info", {
                userEmail: email,
                name,
                reservationTime,
                numOfPeople,
                notes,
                phoneNum,
            });
            alert("Send successfully");
            onConfirmed();
            props.setOpenModal(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button onClick={() => props.setOpenModal("pop-up")} className="font-medium text-primary-600 hover:underline">
                Confirm
            </button>
            <Modal show={props.openModal === "pop-up"} size="md" dismissible popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <i className="fa-solid fa-circle-exclamation text-5xl mb-4 text-gray-400 dark:text-gray-200"></i>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Send mail to {""}
                            <span className="text-black font-bold">{email}</span> and message to phone number
                            <span className="text-black font-bold">{phoneNum}</span> ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleSendEmailAndMessage}>Yes, I'm sure</Button>
                            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ConfirmReservationModal;
