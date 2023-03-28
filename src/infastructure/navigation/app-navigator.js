import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import {RoomsNavigator} from "./room-nav";
import {RoomContextProvider} from "../../services/Foods/Food-Context";
import {SettingsNavigator} from "./settings-navigation";

const Tab = createBottomTabNavigator();

const TABICON = {
    Rooms: "md-home",
    Settings: "md-settings",
};


const createScreenOptions = ({route}) => {
    const iconName = TABICON[route.name];
    return {
        tabBarIcon: ({size, color}) => (
            <Ionicons name={iconName} size={size} color={color}/>
        ),
    };
};


export const AppNavigator = () => (

    <RoomContextProvider>
        <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "grey",
            }}
        >
            <Tab.Screen name="Home" component={RoomsNavigator}/>
            <Tab.Screen name="Settings" component={SettingsNavigator}/>
        </Tab.Navigator>
    </RoomContextProvider>
);
