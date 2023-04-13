import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../../Features/Home/Screen/HomeScreen'; // Update this line
import { HealthContextProvider } from '../../services/Health/Health-Context';

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ route, navigation }) => {
    return (
        <HealthContextProvider>
            <HomeStack.Navigator>
                <HomeStack.Screen
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#F7E9D7',
                        },
                    }}
                    name="HomeScreen"
                    component={HomeScreen}
                />
            </HomeStack.Navigator>
        </HealthContextProvider>
    );
};


