import React, {useContext, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {Chart} from '../Component/Chart';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';

export const FoodDetailScreen = ({route, navigation}) => {
  const {food} = route.params;
  const {AddFood} = useContext(FoodContext);
  const [grams, setGrams] = useState(0);

  const addToSelectedFoods = () => {
    const selectedFood = {
      ...food,
      grams: Number(grams),
    };
    AddFood(selectedFood);
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
      <Button title="Add to list" onPress={addToSelectedFoods} />
    </View>
  );
};