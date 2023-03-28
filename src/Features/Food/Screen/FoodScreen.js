import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {FoodInfo} from '../Component/FoodInfo';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {Search} from '../Component/Search';

export const FoodScreen = ({navigation}) => {
  const {foods} = useContext(FoodContext);

  return (
    <ScrollView style={local.dashboard}>
      <Search />
      {foods.map((post, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            if (post && post.name) {
              navigation.navigate('FoodDetail', {food: post});
            }
          }}>
          {post && post.name ? <FoodInfo food={post} /> : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const local = StyleSheet.create({
  dashboard: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFEEEE',
  },
});
