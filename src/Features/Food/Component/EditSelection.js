import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { FoodInfo } from './FoodInfo';

export const EditSelection = ({
    item,
    onPress,
    ShowIconButtons,
    updateFoodsToRemove,
}) => {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
        updateFoodsToRemove(item, !checked);
    };

    const handlePress = () => {
        if (!ShowIconButtons) {
            onPress();
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {ShowIconButtons && (
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={handleChecked}
                />
            )}
            <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
                <FoodInfo food={item} isSelected={true} />
            </TouchableOpacity>
        </View>
    );
};
