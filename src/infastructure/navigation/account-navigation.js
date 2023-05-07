import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../../Features/Account/Screen/AccountScreen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
      name="Diabetes Managment App"
      component={AccountScreen}
    />
  </Stack.Navigator>
);
