import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../../Features/Home/Screen/HomeScreen';

const HomeStack = createStackNavigator();

export const HomeNavigator = ({route, navigation}) => {
  return (
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
  );
};
