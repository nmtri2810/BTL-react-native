import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../UI/Container";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CreateUserModal from "./CreateUserModal";
import DeleteUserModal from "./DeleteUserModal";

const Users = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [CRUDState, setCRUDState] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosPrivate.get("users?id=all", {
                    signal: controller.signal,
                });
                setCRUDState(false);
                isMounted && setUserList(res.data.users);
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
    }, [axiosPrivate, navigate, CRUDState]);

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
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">{user.id}</td>
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
                                            <button className="font-medium text-primary-600 hover:underline">
                                                Edit
                                            </button>
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
                    <nav className="my-8 flex justify-center">
                        <ul className="inline-flex -space-x-px text-base h-10">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    4
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    5
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <p className="text-xl">No users to display</p>
            )}
        </Container>
    );
};

export default Users;
