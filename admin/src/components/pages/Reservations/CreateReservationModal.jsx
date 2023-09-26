import { Modal } from "flowbite-react";
import { useState } from "react";
import moment from "moment";

import axios from "../../../api/customAxios";

const CreateReservationModal = ({ onReservationCreated }) => {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const [reservationInput, setReservationInput] = useState({
        reservationTime: "",
        numOfPeople: "",
        name: "",
        phoneNum: "",
        email: "",
        notes: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleCreateReservation = async () => {
        //validate...
        try {
            await axios.post("create-reservation", {
                ...reservationInput,
            });
            alert("Create reservation successfully");
            setReservationInput({
                reservationTime: "",
                numOfPeople: "",
                name: "",
                phoneNum: "",
                email: "",
                notes: "",
            });
            onReservationCreated();
            props.setOpenModal(undefined);
        } catch (error) {
            if (!error?.response) {
                alert("No server response");
            } else if (error.response.status === 400) {
                alert("Missing required parameter");
            } else if (error.response.status === 401) {
                alert("User not exist");
            } else {
                alert("Create reservation failed");
            }
        }
    };

    return (
        <>
            <button
                onClick={() => props.setOpenModal("dismissible")}
                className="text-white bg-[#eab849] hover:bg-[#d8aa41] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-2"
            >
                <i className="fa-solid fa-plus mr-2"></i>
                Create new reservation
            </button>
            <Modal
                dismissible
                size="3xl"
                show={props.openModal === "dismissible"}
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header>CREATE NEW RESERVATION</Modal.Header>
                <Modal.Body>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="form-group">
                            <label
                                htmlFor="reservationTime"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Reservation time
                            </label>
                            <input
                                type="datetime-local"
                                name="reservationTime"
                                id="reservationTime"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                min={moment(new Date()).format(
                                    "YYYY-MM-DDTHH:MM"
                                )}
                                value={reservationInput.reservationTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="numOfPeople"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Number of people
                            </label>
                            <input
                                type="number"
                                name="numOfPeople"
                                id="numOfPeople"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="E.g: 3"
                                required
                                min={0}
                                max={100}
                                step={1}
                                value={reservationInput.numOfPeople}
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
                                value={reservationInput.name}
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
                                value={reservationInput.phoneNum}
                                onChange={handleInputChange}
                            />
                        </div>
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
                                value={reservationInput.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="notes"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Notes
                            </label>
                            <input
                                type="text"
                                name="notes"
                                id="notes"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="E.g: Seat next to window, ..."
                                required
                                value={reservationInput.notes}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleCreateReservation}
                    >
                        Create
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateReservationModal;
