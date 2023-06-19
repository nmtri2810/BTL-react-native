import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* replace userInfo.data with true  */}
                {true ? 
                (
                    <>
                    <Stack.Screen name="BottomNav" component={BottomTabNavigation} options={{headerShown: false}} />
                    </>
                ) : 
                (
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
                    </>
                )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
} 

export default Navigation;
 