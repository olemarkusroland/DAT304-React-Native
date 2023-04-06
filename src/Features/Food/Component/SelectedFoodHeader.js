import React from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

const SelectedFoodsHeader = ({
  showIconButtons,
  toggleIconButtons,
  handleRemovefoods,
}) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text
      style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        justifyContent: 'center',
      }}>
      Selected Foods
    </Text>
    <IconButton
      icon={showIconButtons ? 'eye-off' : 'eye'}
      onPress={toggleIconButtons}
    />
    {showIconButtons && (
      <IconButton icon="trash-can" onPress={() => handleRemovefoods()} />
    )}
  </View>
);

export default SelectedFoodsHeader;
