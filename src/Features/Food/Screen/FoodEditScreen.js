import React, {useContext, useState} from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Chart} from '../Component/Chart';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';

export const FoodEditScreen = ({route, navigation}) => {
  const {food} = route.params;
  const {addDistinctFood} = useContext(FoodContext);
  const [grams, setGrams] = useState(food.grams);

  const addToSelectedFoods = () => {
    const selectedFood = {
      ...food,
      grams: Number(grams),
    };
    addDistinctFood(selectedFood);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.carbs}</Text>
      {/* Add more fields from the mock data if needed */}

      <Text style={styles.label}>Grams:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={text => setGrams(Number(text))}
        value={grams.toString()}
      />
      <Button title="Confirm Change" onPress={addToSelectedFoods} />
    </View>
  );
};
