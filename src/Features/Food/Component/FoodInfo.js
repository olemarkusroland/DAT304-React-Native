import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FoodInfo = React.memo(function FoodInfo({ food, isSelected }) {
    const formattedCarbs = isSelected
        ? Number(food.carbohydrates * food.grams / 1000).toFixed(0)
        : Number(food.carbohydrates).toFixed(0);

    return (
        <View style={styles.container}>
            {isSelected ? (
                <View>
                    <Text style={styles.name}>{food.name}</Text>
                    <Text style={styles.grams}>{food.grams}g</Text>
                </View>
            ) : (
                <Text style={styles.name}>{food.name}</Text>
            )}
            <View>
                {isSelected && (
                    <Text style={styles.description}>
                        Carbs/kg: {Number(food.carbohydrates).toFixed(0)}
                    </Text>
                )}
                <Text style={styles.description}>
                    {isSelected ? "Carbs/amount" : "Carbs/kg"}: {formattedCarbs}
                </Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        color: 'gray',
    },
    grams: {
        fontSize: 18,
        color: 'gray',
    },
});
