import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/customAxios";

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("login", {
                email,
                password,
            });
            const accessToken = res.data.access_token;
            const role = res.data.user.role_id;

            setAuth({ email, role, accessToken });

            if (role === "AD") {
                navigate("/", { replace: true });
            } else if (role === "US") {
                navigate("/unauthorized", { replace: true });
            }
        } catch (error) {
            if (!error?.response) {
                alert("No server response");
            } else if (error.response.status === 400) {
                alert("Missing username or password");
            } else if (error.response.status === 401) {
                alert("Unauthorized");
            } else {
                alert("Login failed");
            }
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="mb-10 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">ADMIN LOGIN</h1>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="space-y-4 md:space-y-6">
                            <div className="form-group">
                                <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="email@company.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type={"password"}
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
