import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ReservationScreen from '../screens/ReservationScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo.data ? 
                (
                    <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Reservation" component={ReservationScreen} />
                    </>
                ) : 
                (
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
} 

export default Navigation;
 