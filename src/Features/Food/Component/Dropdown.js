import {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const Dropdown = ({label, data, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={local.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  const onItemPress = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={local.overlay}
            onPress={() => setVisible(false)}>
            <View style={[local.dropdown]}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
  };

  return (
    <TouchableOpacity style={local.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={local.buttonText}>
        {(selected && selected.label) || label}
      </Text>
    </TouchableOpacity>
  );
};
const local = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    bottom: 100,
    top: 100,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
