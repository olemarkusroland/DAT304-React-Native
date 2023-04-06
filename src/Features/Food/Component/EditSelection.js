import React, {useContext, useState} from 'react';
import {IconButton, Searchbar} from 'react-native-paper';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {FoodInfo} from './FoodInfo';

export const EditSelection = ({
  item,
  onPress,
  selectedItems,
  setSelectedItems,
  ShowIconButtons,
  updateFoodsToRemove,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  const handleSelect = () => {
    setIsSelected(!isSelected);
    updateFoodsToRemove(item, !isSelected);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: ShowIconButtons ? 0.85 : 1}}>
          <FoodInfo food={item} />
        </View>
        <View style={{flex: 0.15}}>
          {ShowIconButtons && (
            <IconButton
              icon={
                isSelected ? 'check-circle' : 'checkbox-blank-circle-outline'
              }
              size={20}
              onPress={() => {
                handleSelect(item);
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
