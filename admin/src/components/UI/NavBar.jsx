import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const [isShown, setIsShown] = useState(false);

    const { auth } = useAuth();

    const showUserDropdown = () => {
        setIsShown(!isShown);
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
                                to="/Roles"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Roles
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
                        <li>
                            <NavLink
                                to="/News"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                News
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Notifications"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Notifications
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center relative">
                    <button
                        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        onClick={showUserDropdown}
                    >
                        <img
                            className="w-8 h-8 rounded-full bg-white"
                            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                            alt="user"
                        />
                    </button>
                    <div
                        className={`z-50 absolute top-9 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border-gray-100 border-solid border dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown ${isShown ? "block" : "hidden"}`}
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">
                                {auth.email}
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </Link>
                            </li>
                        </ul>
                    </div>
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
            </div>
        </nav>
    );
};

export default NavBar;
