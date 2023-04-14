import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FoodInfo = React.memo(function FoodInfo({ food, isSelected }) {
    const formattedCarbs = isSelected
        ? Number(food.carbohydrates * food.grams / 1000).toFixed(0)
        : Number(food.carbohydrates).toFixed(0);

    const carbUnit = isSelected ? 'Carbs/amount' : 'Carbs/kg';

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{food.name}</Text>
            <Text style={styles.description}>
                {carbUnit}: {formattedCarbs}
            </Text>
            {isSelected && (
                <Text style={styles.grams}>Amount: {food.grams}g</Text>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
    grams: {
        fontSize: 14,
        color: 'gray',
    },
});
