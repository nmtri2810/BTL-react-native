import React, { createContext, useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, password) => {
        setIsLoading(true);

        axios.post('http://192.168.0.104:3000/api/signup', {
            email, password
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    }

    const login = (email, password) => {
        setIsLoading(true);


    }

    return (
        <AuthContext.Provider value={{register, isLoading, userInfo}}>{children}</AuthContext.Provider>
    );
}