import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Context from "../store/Context";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import SuccessScreen from "../screens/SuccessScreen";
import ReservationHistoryScreen from "../screens/ReservationHistoryScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { userInfo } = useContext(Context);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo.access_token ? (
                    <>
                        <Stack.Screen
                            name="BottomNav"
                            component={BottomTabNavigation}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Table Reservation Information"
                            component={SuccessScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
                <Stack.Screen
                    name="Reservation History"
                    component={ReservationHistoryScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
