import React, { useEffect, useState } from "react";
import moment from "moment";
import { Badge } from "flowbite-react";

import Container from "../../UI/Container";
import axios from "../../../api/customAxios";

const Reservations = () => {
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`reservations?id=all`);
                setReservationList(res.data.reservations);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const setStatus = (statusId) => {
        switch (statusId) {
            case "S1":
                return "New";
            case "S2":
                return "Confirmed";
            case "S3":
                return "Done";
            case "S4":
                return "Canceled";
            default:
                return "";
        }
    };

    const handleTimeFormat = (time) => {
        return moment(time).format("MMMM, Do YYYY HH:mm");
    };

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-4">Manage Reservations</h1>
            {reservationList?.length ? (
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
                            {/* <CreateUserModal
                                onUserCreated={() => {
                                    setCRUDState(true);
                                }}
                            /> */}
                        </div>
                        <div>
                            <select
                                name="sort"
                                id="sort"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                // value={sortValue}
                                // onChange={handleSortChange}
                            >
                                <option value="">Reservation status</option>
                                <option value="asc">New</option>
                                <option value="asc">Confirmed</option>
                                <option value="asc">Done</option>
                                <option value="asc">Canceled</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-80">
                        <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm text-gray-700 bg-gray-100">
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
                                <tbody>
                                    {reservationList.map(
                                        (reservation, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {reservation.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reservation.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reservation.phone_num}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reservation.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {handleTimeFormat(
                                                        reservation.reservation_time
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {reservation.num_of_people}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {reservation.notes}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        size="sm"
                                                        color="warning"
                                                    >
                                                        {setStatus(
                                                            reservation.status_id
                                                        )}
                                                    </Badge>
                                                    {/* <Badge
                                                        size="sm"
                                                        color="info"
                                                    >
                                                        Confirmed
                                                    </Badge>
                                                    <Badge
                                                        size="sm"
                                                        color="success"
                                                    >
                                                        Done
                                                    </Badge>
                                                    <Badge
                                                        size="sm"
                                                        color="failure"
                                                    >
                                                        Canceled
                                                    </Badge> */}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="font-medium text-primary-600 hover:underline">
                                                        Confirm
                                                    </button>
                                                    {/* <button className="font-medium text-primary-600 hover:underline">
                                                        Edit
                                                    </button>
                                                    <button className="font-medium text-red-600 hover:underline ml-3">
                                                        Delete
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <PaginatedItems
                        currentPage={currentPage}
                        setCurrentPage={(page) => setCurrentPage(page)}
                        totalPages={totalPages}
                    /> */}
                </div>
            ) : (
                <p className="text-xl">No reservations to display</p>
            )}
        </Container>
    );
};

export default Reservations;
