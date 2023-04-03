import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';

import { readFoods } from './backend/realm/CRUD';

import { realmOpen } from './backend/realm/utils';

//import './backend/realm/testCRUD.js';

interface FoodType {
    name: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
}

const App = () => {
    const [foods, setFoods] = useState<FoodType[]>([]);

    useEffect(() => {
        (async () => {
            const realm = await realmOpen();
            const allFoods = await readFoods(realm);
            setFoods(allFoods || []);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {foods.map((food, index) => (
                    <Text key={index} style={styles.text}>
                        {food.name}: {food.calories} cals, {food.carbohydrates}g carbs, {food.protein}g prot, {food.fat}g fat
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default App;
