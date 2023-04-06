import React, {useCallback, useContext, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FoodInfo} from '../Component/FoodInfo';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {Search} from '../Component/Search';
import {EditSelection} from '../Component/EditSelection';
import {IconButton} from 'react-native-paper';
import SelectedFoodsHeader from '../Component/SelectedFoodHeader';

export const FoodScreen = ({navigation}) => {
  const {foods, selectedFoods, RemoveFood} = useContext(FoodContext);
  const [pickedFood, setPickedFood] = useState([]);
  const [showIconButtons, setShowIconButtons] = useState(false);
  const [foodsToRemove, setFoodsToRemove] = useState([]);

  const SearchHeaderComponent = <Search />;
  const renderFood = useCallback(
    ({item}) => {
      if (!item || !item.name || !item.carbohydrates) {
        return null;
      }
      const onPress = () => {
        navigation.navigate('FoodDetail', {food: item});
      };

      return (
        <TouchableOpacity onPress={onPress}>
          <FoodInfo food={item} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const handleRemoveFoods = () => {
    if (foodsToRemove.length > 0) {
      Alert.alert(
        'Remove Foods',
        'Are you sure you want to remove the selected foods?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              foodsToRemove.forEach(food => RemoveFood(food));
              setFoodsToRemove([]);
            },
          },
        ],
      );
    }
  };
  const updateFoodsToRemove = (food, shouldAdd) => {
    if (shouldAdd) {
      setFoodsToRemove(prevFoodsToRemove => [...prevFoodsToRemove, food]);
    } else {
      setFoodsToRemove(prevFoodsToRemove =>
        prevFoodsToRemove.filter(f => f !== food),
      );
    }
  };
  const toggleIconButtons = () => {
    setShowIconButtons(!showIconButtons);
  };

  const renderSelectedFood = ({item}) => {
    const handleEdit = () => {
      navigation.navigate('FoodEdit', {
        food: item,
      });
    };

    const handleSelected = (selectedItem, updatedSelectedItems) => {
      setPickedFood(updatedSelectedItems);
      RemoveFood(selectedItem);
    };

    return (
      <EditSelection
        item={item}
        selectedItems={selectedFoods}
        onPress={handleEdit}
        setSelectedItems={handleSelected}
        ShowIconButtons={showIconButtons}
        updateFoodsToRemove={updateFoodsToRemove} // Add this prop
      />
    );
  };

  return (
    <View>
      <FlatList
        data={foods}
        renderItem={renderFood}
        keyExtractor={item => 'search-' + item.name.toString()}
        ListHeaderComponent={SearchHeaderComponent}
      />
      <FlatList
        data={selectedFoods}
        renderItem={renderSelectedFood}
        keyExtractor={item => 'Selected-' + item.name.toString()}
        ListHeaderComponent={
          <SelectedFoodsHeader
            showIconButtons={showIconButtons}
            toggleIconButtons={() => toggleIconButtons()}
            handleRemovefoods={() => handleRemoveFoods()}
          />
        }
      />
    </View>
  );
};
