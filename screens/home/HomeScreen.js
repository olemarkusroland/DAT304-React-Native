import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Button
      title="Go to Profile"
      onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Profile"})}>
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
