import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthenticationContext} from '../../services/Auth/Auth-Context';

export const SettingScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
};
