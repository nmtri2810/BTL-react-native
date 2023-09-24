import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../UI/Container";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CreateUserModal from "./CreateUserModal";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import PaginatedItems from "../../UI/PaginatedItems";

const Users = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [CRUDState, setCRUDState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosPrivate.get(
                    `users?id=all&page=${currentPage}&limit=${currentLimit}`,
                    {
                        signal: controller.signal,
                    }
                );
                setTotalPages(res.data.users.pagination.totalPages);
                setCRUDState(false);
                isMounted && setUserList(res.data.users.data);
            } catch (error) {
                console.log(error);
                navigate("/login", { replace: true });
                window.location.reload();
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        };
    }, [axiosPrivate, navigate, CRUDState, currentPage, currentLimit]);

    const setRole = (roleId) => {
        switch (roleId) {
            case "AD":
                return "Admin";
            case "US":
                return "User";
            case "MA":
                return "Manager";
            default:
                return "";
        }
    };

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
            {userList?.length ? (
                <div className="body">
                    <div className="mb-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-2"
                        >
                            <i className="fa-solid fa-rotate-right mr-2"></i>
                            Refresh
                        </button>
                        <CreateUserModal
                            onUserCreated={() => {
                                setCRUDState(true);
                            }}
                        />
                    </div>
                    <div className="h-80">
                        <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm text-white bg-primary-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {(currentPage - 1) *
                                                    currentLimit +
                                                    index +
                                                    1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.phone_num}
                                            </td>
                                            <td className="px-6 py-4">
                                                {setRole(user.role_id)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <EditUserModal
                                                    email={user.email}
                                                    name={user.name}
                                                    phoneNum={user.phone_num}
                                                    role={user.role_id}
                                                    onUserEdit={() =>
                                                        setCRUDState(true)
                                                    }
                                                />
                                                <DeleteUserModal
                                                    userId={user.id}
                                                    email={user.email}
                                                    onUserDelete={() =>
                                                        setCRUDState(true)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PaginatedItems
                        currentPage={currentPage}
                        setCurrentPage={(page) => setCurrentPage(page)}
                        totalPages={totalPages}
                    />
                </div>
            ) : (
                <p className="text-xl">No users to display</p>
            )}
        </Container>
    );
};

export default Users;
