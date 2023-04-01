import React, {useCallback, useContext} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FoodInfo} from '../Component/FoodInfo';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {Search} from '../Component/Search';

export const FoodScreen = ({navigation}) => {
  const {foods, isLoading, addToSelectedFoods, selectedFoods} =
    useContext(FoodContext);
  const listHeaderComponent = <Search />;

  const renderFood = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (item && item.name && item.carbs) {
              navigation.navigate('FoodDetail', {
                food: item,
              });
            }
          }}>
          {item && item.name && item.carbs ? <FoodInfo food={item} /> : null}
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const renderSelectedFood = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (item && item.name && item.carbs) {
              navigation.navigate('FoodEdit', {
                food: item,
              });
            }
          }}>
          {item && item.name && item.carbs ? <FoodInfo food={item} /> : null}
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View>
      <FlatList
        data={foods}
        renderItem={renderFood}
        keyExtractor={item => 'search-' + item.name.toString()}
        ListHeaderComponent={listHeaderComponent}
      />
      <FlatList
        data={selectedFoods}
        renderItem={renderSelectedFood}
        keyExtractor={item => 'Selected-' + item.name.toString()}
        ListHeaderComponent={
          <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20}}>
            Selected Foods
          </Text>
        }
      />
    </View>
  );
};
