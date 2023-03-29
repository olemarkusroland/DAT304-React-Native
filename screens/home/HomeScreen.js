import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import InformationChart from '../../components/infograph';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
      onPress= {() =>
        navigation.navigate("TabNavigator", {screen: "Information"})}>
        <InformationChart></InformationChart>
      </TouchableOpacity>
      <Button
      title="Go to Food"
      onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Food"})}>
      </Button>
    
      <Button
      title="Information"
      onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Information"})}>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
