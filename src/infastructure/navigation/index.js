import React, {useContext} from 'react';
import {AppNavigator} from './app-navigator';
import {AccountNavigator} from './account-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthenticationContext} from '../../services/Auth/Auth-Context';
import {View, StyleSheet} from 'react-native';

export const Navigation = () => {
  const {isAuthenticated} = useContext(AuthenticationContext);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
