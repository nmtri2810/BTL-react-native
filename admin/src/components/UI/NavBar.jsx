import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/customAxios";

const NavBar = () => {
    const { auth } = useAuth();

    const handleLogout = () => {
        axios.post("logout");
        window.location.reload();
    };

    return (
        <nav
            id="navbar"
            className="bg-white border-gray-200 dark:bg-gray-900 shadow"
        >
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Users"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Reservations"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Reservations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Deals"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Deals
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Dropdown
                    inline
                    placement="bottom-end"
                    label={
                        <Avatar
                            alt="User"
                            img="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                            size="sm"
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block truncate text-sm font-medium">
                            {auth.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={handleLogout}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <button
                    data-collapse-toggle="navbar-user"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-user"
                    aria-expanded="false"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
