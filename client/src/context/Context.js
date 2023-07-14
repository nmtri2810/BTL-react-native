import React, { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/config";

export const Context = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [reservationInfo, setReservationInfo] = useState({});
    const [reservationHistoryInfo, setReservationHistoryInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //note: localhost ip changed!

    const register = (email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/register`, {
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
            .post(`${BASE_URL}/login`, {
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

    const reservate = (reservationTime, numOfPeople, notes, email) => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}/reservate`, {
                    reservationTime,
                    numOfPeople,
                    notes,
                    email,
                })
                .then(async (res) => {
                    let reservationInfo = res.data;
                    setReservationInfo(reservationInfo);
                    await AsyncStorage.setItem(
                        "reservationInfo",
                        JSON.stringify(reservationInfo)
                    );
                    setIsLoading(false);
                    resolve(reservationInfo);
                })
                .catch((e) => {
                    console.log(`reservate error ${e}`);
                    setIsLoading(false);
                    reject(e);
                });
        });
    };

    const updateUser = (name, phoneNum, email) => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {
            axios
                .put(`${BASE_URL}/update-user`, {
                    name,
                    phoneNum,
                    email,
                })
                .then((res) => {
                    let userInfo = res.data;
                    setUserInfo(userInfo);
                    AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                    setIsLoading(false);
                    resolve(userInfo);
                })
                .catch((e) => {
                    console.log(`update error ${e}`);
                    setIsLoading(false);
                    reject(e);
                });
        });
    };

    const reservationHistory = (email) => {
        axios
            .get(`${BASE_URL}/reservation/${email}`)
            .then((res) => {
                let reservationHistoryInfo = res.data;
                setReservationHistoryInfo(reservationHistoryInfo);
            })
            .catch((e) => {
                console.log(`reservation history error ${e}`);
            });
    };

    return (
        <Context.Provider
            value={{
                register,
                login,
                logout,
                reservate,
                updateUser,
                reservationHistory,
                isLoading,
                userInfo,
                reservationInfo,
                reservationHistoryInfo,
            }}
        >
            {children}
        </Context.Provider>
    );
};
