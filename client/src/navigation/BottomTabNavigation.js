import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../bottomTabScreens/HomeScreen";
import ReservationScreen from "../bottomTabScreens/ReservationScreen";
import NotificationScreen from "../bottomTabScreens/NotificationScreen";
import AccountScreen from "../bottomTabScreens/AccountScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#eab849"
            shifting={true}
            barStyle={{
                backgroundColor: "#fff",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.8,
                shadowRadius: 16.0,
                elevation: 24,
                shadowColor: "#000",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Reservation"
                component={ReservationScreen}
                options={{
                    tabBarLabel: "Reservation",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="calendar-clock-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: "Notification",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="bell-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: "Account",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
