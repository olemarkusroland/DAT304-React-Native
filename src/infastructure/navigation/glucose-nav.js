import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import InformationScreen from '../../Features/Home/Screen/InformationScreen';
import RecentFoodScreen from '../../Features/Home/Screen/FoodScreen';
const InformationStack = createStackNavigator();

export const InformationNavigator = ({route, navigation}) => {
  return (
    <InformationStack.Navigator>
      <InformationStack.Screen
        options={{
          header: () => null,
          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
        name="Information"
        component={InformationScreen}
      />
      <InformationStack.Screen
        options={{
          header: () => null,
          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
        name="RecentFood"
        component={RecentFoodScreen}
      />
    </InformationStack.Navigator>
  );
};
