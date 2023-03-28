import React from "react";
import {createStackNavigator,} from "@react-navigation/stack";

import {SettingScreen} from "../../Features/Settings/SettingsScreen";


const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
    return (
        <SettingsStack.Navigator


        >
            <SettingsStack.Screen
                options={{
                    header: () => null,
                    headerStyle: {
                    backgroundColor: '#F7E9D7',
                }

                }}
                name="Settings"
                component={SettingScreen}
            />
        </SettingsStack.Navigator>
    );
};
