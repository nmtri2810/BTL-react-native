import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../bottomTabScreens/HomeScreen';
import ReservationScreen from '../bottomTabScreens/ReservationScreen';
import NotificationScreen from '../bottomTabScreens/NotificationScreen';
import AccountScreen from '../bottomTabScreens/AccountScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="blue"
          labelStyle={{ fontSize: 12 }}
          shifting={true}
          barStyle={{ backgroundColor: "white" }}
        >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home-outline" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen 
              name="Reservation" 
              component={ReservationScreen} 
              options={{
                tabBarLabel: 'Reservation',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="calendar-clock-outline" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen 
              name="Notification" 
              component={NotificationScreen}
              options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell-outline" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen 
              name="Account" 
              component={AccountScreen} 
              options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-outline" color={color} size={26} />
                ),
              }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;