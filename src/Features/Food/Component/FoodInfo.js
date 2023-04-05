import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {roundToDecimal} from '../../../../backend/realm/utils';

export const FoodInfo = React.memo(function FoodInfo({food}) {
  return (
    <View style={styles.container3}>
      <Text style={styles.name}>{food.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.info}>
          Carbs per 100g {roundToDecimal(food.carbohydrates, 2)}
        </Text>
        <Text style={styles.info}>
          {food.grams && ` Amount: ${food.grams} g`}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'column',
  },
});
