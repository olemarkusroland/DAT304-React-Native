import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {FoodScreen} from '../../Features/Room/Screen/FoodScreen';
import {FoodDetailScreen} from '../../Features/Room/Screen/FoodDetailScreen';
import {Add_RoomScreen} from '../../Features/Room/Screen/Add_Room';
import {Delete_RoomScreen} from '../../Features/Room/Screen/Delete_Room';

const RoomStack = createStackNavigator();

export const RoomsNavigator = () => {
  return (
    <RoomStack.Navigator>
      <RoomStack.Screen
        options={{
          header: () => null,

          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
        name="Rooms"
        component={FoodScreen}
      />
      <RoomStack.Screen
        name="RoomDetail"
        component={FoodDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
      />
      <RoomStack.Screen
        name="AddRoom"
        component={Add_RoomScreen}
        options={{
          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
      />
      <RoomStack.Screen
        name="DeleteRoom"
        component={Delete_RoomScreen}
        options={{
          headerStyle: {
            backgroundColor: '#F7E9D7',
          },
        }}
      />
    </RoomStack.Navigator>
  );
};
