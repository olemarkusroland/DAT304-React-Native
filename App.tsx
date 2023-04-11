import React from 'react';
import {View} from 'react-native';
import {AuthenticationContextProvider} from './src/services/Auth/Auth-Context';
import Navigation from './src/infastructure/navigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </View>
  );
};

export default App;
