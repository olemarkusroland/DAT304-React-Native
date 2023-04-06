import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../../Features/Home/Screen/HomeScreen';
import {HealthContextProvider} from '../../services/Health/Health-Context';

const HomeStack = createStackNavigator();

export const HomeNavigator = ({route, navigation}) => {
  return (
    <HealthContextProvider>
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{
            header: () => null,
            headerStyle: {
              backgroundColor: '#F7E9D7',
            },
          }}
          name="Home"
          component={HomeScreen}
        />
      </HomeStack.Navigator>
    </HealthContextProvider>
  );
};
