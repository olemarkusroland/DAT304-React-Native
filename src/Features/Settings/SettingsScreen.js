import React, {useContext} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {AuthenticationContext} from '../../services/Auth/Auth-Context';

export const SettingScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      {/* Other settings components can be added here */}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
