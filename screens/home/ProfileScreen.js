import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>

      <Button
      title="Go to Home"
      onPress={() => 
        navigation.navigate("TabNavigator", {screen: "Home"})}>
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

export default ProfileScreen;
