import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text} from 'react-native';
import { FoodContext } from '../../../services/Foods/Food-Context';
import { styles } from '../../../Styles';

export const FoodCreateScreen = ({ navigation }) => {
    const { addFood } = useContext(FoodContext);
    const [name, setName] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');

    const handleSubmit = async () => {
        await addFood(name, 0, parseFloat(carbohydrates), 0, 0);
        navigation.goBack();
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Food name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Carbohydrates (g)"
                value={carbohydrates}
                onChangeText={setCarbohydrates}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableOpacity>
        </View>
    );
};
