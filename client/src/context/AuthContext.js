import React, { createContext, useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../config/config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //note: localhost ip changed!

    const checkUserExist = (email) => {
        setIsLoading(true);
    
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/users/${email}`)
            .then(res => {
                let userInfo = res.data;
                if (userInfo.data && userInfo.data.email.toLowerCase() === email.toLowerCase()) {
                    setIsLoading(false);
                    resolve(true);
                } else {
                    setIsLoading(false);
                    resolve(false);
                }
            })
            .catch(e => {
                setIsLoading(false);
                console.log(`check error ${e}`);
                reject(e);
            });
        });
    }

    const register = (email, password) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/register`, {
            email, password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
        }).catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    }

    const login = (email, password) => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/login`, {
                email, password
            })
            .then(res => {
                let userInfo = res.data;
                if(Object.keys(userInfo).length === 0) {
                    console.log(userInfo);
                    resolve(false);
                    setIsLoading(false);
                } else {
                    console.log(userInfo);
                    resolve(true);
                    setUserInfo(userInfo);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    setIsLoading(false);
                }
            })
            .catch(e => {
                console.log(`login error ${e}`);
                reject(e);
                setIsLoading(false);
            });
        });
    }

    const logout = () => {
        setIsLoading(true);

        try {
            setUserInfo({});
            AsyncStorage.removeItem('userInfo');
            setIsLoading(false);
        } catch (e) {
            console.log(`logout error ${e}`);
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            checkUserExist,
            register,
            login,
            logout,
            isLoading, 
            userInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
}