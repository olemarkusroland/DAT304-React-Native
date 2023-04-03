import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {realmOpen, isRealmEmpty} from './backend/realm/utils.js';
import {updateGlucose} from './backend/realm/CRUD.js';
import {BackgroundTest} from './backend/background-fetch.js';


//import './backend/realm/testCRUD.js';

interface FoodType {
    name: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
}
import './backend/realm/testCRUD.js';
import {AuthenticationContextProvider} from './src/services/Auth/Auth-Context.js';
import {Navigation} from './src/infastructure/navigation/index.js';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default App;
