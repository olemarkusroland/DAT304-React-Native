import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { foodlist, renderFoodEntry, food_styles } from '../Component/foodlist';
import { FoodContext } from '../../../services/Foods/Food-Context';

const RecentFoodScreen = ({ navigation, route }) => {
    const { item } = route.params;

    return (
        <View style={food_styles.container}>
            <Text style={food_styles.titleText}>Recently Eaten Food</Text>
            <FlatList
                data={item}
                renderItem={renderFoodEntry}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

export default RecentFoodScreen;
