import React, { createContext, useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //note: localhost ip changed!

    const checkUserExist = (email) => {
        setIsLoading(true);
    
        return new Promise((resolve, reject) => {
          axios.get(`http://10.90.219.213:3000/api/users/${email}`)
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

        axios.post('http://10.90.219.213:3000/api/signup', {
            email, password
        }).then(res => {
            let userInfo = res.data;
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


    }

    return (
        <AuthContext.Provider value={{
            checkUserExist,
            register, 
            isLoading, 
            userInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
}