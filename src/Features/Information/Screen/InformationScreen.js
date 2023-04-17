import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {
    renderFoodEntry,
    food_styles,
} from '../../Home/Component/foodlist';
import { HealthContext } from '../../../services/Health/Health-Context';
import { FoodContext } from '../../../services/Foods/Food-Context';

const InformationScreen = ({ navigation }) => {
    const { getFoodEntries } = useContext(FoodContext);

    const [recentFoodEntries, setRecentFoodEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const entries = await getFoodEntries();
            setRecentFoodEntries(entries);
            console.log("Food Entries: ", entries)
        };
        fetchData();
    }, []);

    if (false) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={food_styles.container}>
                <TouchableOpacity
                    style={{
                        borderRadius: 5,
                        borderColor: '#ddd',
                        flex: 1,
                        backgroundColor: '#ddd',
                    }}
                    onPress={() => navigation.navigate('RecentFood', { item: recentFoodEntries })}>
                                
                    <Text style={food_styles.titleText}>Recently Eaten Food</Text>
                    <FlatList
                        data={recentFoodEntries}
                        renderItem={renderFoodEntry}
                        keyExtractor={item => item._id}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        marginTop: 'auto',
    },
});
export default InformationScreen;
