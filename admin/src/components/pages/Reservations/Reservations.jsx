import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Badge } from "flowbite-react";

import Container from "../../UI/Container";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CreateReservationModal from "./CreateReservationModal";
import PaginatedItems from "../../UI/PaginatedItems";
import ConfirmReservationModal from "./ConfirmReservationModal";
import DoneReservationModal from "./DoneReservationModal";
import CancelReservationModal from "./CancelReservationModal";

const Reservations = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [reservationList, setReservationList] = useState([]);
    const [CRUDState, setCRUDState] = useState(false);
    const [statusId, setStatusId] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPrivate.get(`reservations?id=all&status=${statusId}&page=${currentPage}&limit=${currentLimit}`);
                setTotalPages(res.data.reservations.pagination.totalPages);
                setCRUDState(false);
                setReservationList(res.data.reservations.data);
            } catch (error) {
                console.log(error);
                navigate("/login", { replace: true });
                window.location.reload();
            }
        };

        fetchData();
    }, [axiosPrivate, navigate, CRUDState, statusId, currentPage, currentLimit]);

    const setStatus = (statusId) => {
        switch (statusId) {
            case "S1":
                return { text: "New", color: "warning" };
            case "S2":
                return { text: "Confirmed", color: "info" };
            case "S3":
                return { text: "Done", color: "success" };
            case "S4":
                return { text: "Canceled", color: "failure" };
            default:
                return "";
        }
    };

    const handleTimeFormat = (time) => {
        return moment(time).format("MMMM, Do YYYY HH:mm");
    };

    const handleChooseStatus = (e) => {
        setStatusId(e.target.value);
    };

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-4">Manage Reservations</h1>
            <div className="body">
                <div className="mb-4 flex justify-between">
                    <div>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-2"
                        >
                            <i className="fa-solid fa-rotate-right mr-2"></i>
                            Refresh
                        </button>
                        <CreateReservationModal
                            onReservationCreated={() => {
                                setCRUDState(true);
                            }}
                        />
                    </div>
                    <div>
                        <select
                            name="sort"
                            id="sort"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={statusId}
                            onChange={handleChooseStatus}
                        >
                            <option value="all">Reservation status</option>
                            <option value="S1">New</option>
                            <option value="S2">Confirmed</option>
                            <option value="S3">Done</option>
                            <option value="S4">Canceled</option>
                        </select>
                    </div>
                </div>
                <div className="h-[28rem]">
                    <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-sm text-slate-50 bg-[#eab849]">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Reservation ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Reservation time
                                    </th>
                                    <th scope="col" className="py-3">
                                        Number of people
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Notes
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {reservationList?.length ? (
                                <tbody>
                                    {reservationList.map((reservation, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">{reservation.id}</td>
                                            <td className="px-6 py-4">{reservation.email}</td>
                                            <td className="px-6 py-4">{reservation.phone_num}</td>
                                            <td className="px-6 py-4">{reservation.name}</td>
                                            <td className="px-6 py-4">{handleTimeFormat(reservation.reservation_time)}</td>
                                            <td className="py-4">{reservation.num_of_people}</td>
                                            <td className="px-6 py-4">{reservation.notes}</td>
                                            <td className="px-6 py-4">
                                                <Badge size="sm" color={setStatus(reservation.status_id).color}>
                                                    {setStatus(reservation.status_id).text}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                {reservation.status_id === "S1" && (
                                                    <ConfirmReservationModal
                                                        email={reservation.email}
                                                        phoneNum={reservation.phone_num}
                                                        name={reservation.name}
                                                        reservationTime={reservation.reservation_time}
                                                        numOfPeople={reservation.num_of_people}
                                                        notes={reservation.notes}
                                                        reservationId={reservation.id}
                                                        onConfirmed={() => setCRUDState(true)}
                                                    />
                                                )}
                                                {reservation.status_id === "S2" && (
                                                    <div className="flex">
                                                        <DoneReservationModal reservationId={reservation.id} onConfirmed={() => setCRUDState(true)} />
                                                        <CancelReservationModal reservationId={reservation.id} onConfirmed={() => setCRUDState(true)} />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-3 text-lg">No reservations with {setStatus(statusId).text} status to display</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <PaginatedItems currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} totalPages={totalPages} />
            </div>
        </Container>
    );
};

export default Reservations;
