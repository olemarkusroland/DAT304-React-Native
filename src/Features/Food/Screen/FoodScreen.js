import React, {useCallback, useContext} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {FoodInfo} from '../Component/FoodInfo';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {Search} from '../Component/Search';

export const FoodScreen = ({navigation}) => {
  const {foods, isLoading} = useContext(FoodContext);
  const listHeaderComponent = <Search />;

  const renderFood = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (item && item.name && item.carbs) {
              navigation.navigate('FoodDetail', {food: item});
            }
          }}>
          {item && item.name && item.carbs ? <FoodInfo food={item} /> : null}
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <FlatList
      data={foods}
      renderItem={renderFood}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={listHeaderComponent}
    />
  );
};
