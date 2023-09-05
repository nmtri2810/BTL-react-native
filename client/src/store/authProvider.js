import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Context from "./Context";
import axios from "../services/customAxios";

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, password) => {
        setIsLoading(true);

        axios
            .post("register", {
                email,
                password,
            })
            .then((res) => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch((e) => {
                if (e.response && e.response.status === 403) {
                    alert("Email already exists");
                }
                console.log(`register error ${e}`);
                setIsLoading(false);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios
            .post("login", {
                email,
                password,
            })
            .then((res) => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    if (e.response.data.message === "Wrong password") {
                        alert("Wrong password");
                    } else if (e.response.data.message === "User not exist") {
                        alert("Email not exist");
                    }
                }
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);

        try {
            setUserInfo({});
            AsyncStorage.removeItem("userInfo");
            setIsLoading(false);
        } catch (e) {
            console.log(`logout error ${e}`);
            setIsLoading(false);
        }
    };

    return (
        <Context.Provider
            value={{
                isLoading,
                userInfo,
                register,
                login,
                logout,
            }}
        >
            {children}
        </Context.Provider>
    );
};
