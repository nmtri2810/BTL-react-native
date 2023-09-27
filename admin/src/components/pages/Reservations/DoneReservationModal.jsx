import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

import axios from "../../../api/customAxios";

const DoneReservationModal = ({ reservationId, onConfirmed }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const handleDoneBtn = async () => {
        try {
            await axios.put("update-status", {
                reservationId,
                statusId: "S3",
            });
            alert("Done!");
            onConfirmed();
            props.setOpenModal(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button onClick={() => props.setOpenModal("pop-up")} className="font-medium text-green-600 hover:underline">
                Done
            </button>
            <Modal show={props.openModal === "pop-up"} size="md" dismissible popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <i className="fa-solid fa-circle-exclamation text-5xl mb-4 text-gray-400 dark:text-gray-200"></i>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Done?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={handleDoneBtn}>
                                Yes, I'm sure
                            </Button>
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

export default DoneReservationModal;
