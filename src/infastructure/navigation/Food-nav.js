import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {FoodScreen} from '../../Features/Food/Screen/FoodScreen';
import {FoodDetailScreen} from '../../Features/Food/Screen/FoodDetailScreen';
import {FoodEditScreen} from '../../Features/Food/Screen/FoodEditScreen';

const RoomStack = createStackNavigator();

export const FoodsNavigator = () => {
  return (
    <RoomStack.Navigator>
      <RoomStack.Screen
        options={{
          header: () => null,

          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="Food"
        component={FoodScreen}
      />
      <RoomStack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      <RoomStack.Screen
        name="FoodEdit"
        component={FoodEditScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </RoomStack.Navigator>
  );
};
