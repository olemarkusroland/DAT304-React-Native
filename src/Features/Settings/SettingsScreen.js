import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Button} from 'react-native';
import {AuthenticationContext} from '../../services/Auth/Auth-Context';
import { updateGlucose, updateGlucoseLog, deleteGlucoseTest} from '../../../backend/realm/CRUD';
import { realmOpen } from '../../../backend/realm/utils';
import { UseGlucoseData, UseInsulinBasalData, UseInsulinData } from '../../../backend/nightscoutAPI';

export const SettingScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);
  const [realm, setRealm] = useState(null);
  const [testString, setTestString] = useState('');
  const [amount, setAmount] = useState('');

  const initializeRealm = async () => {
    const r = await realmOpen();
    setRealm(r);
};

  const handleLogout = () => {
    onLogout();
  };

  const handleInputChange = (text) => {
    setAmount(text);
  };


    function testAPI(amount) {
        const lastMonth = new Date(Date.now() - (amount * 24 * 60 * 60 * 1000));
        const end = Date.now();
        const start = new Date(end).toISOString();
        const endISO = lastMonth.toISOString();
        const timeStart = global.nativePerformanceNow();
        UseGlucoseData(endISO, start)
            .then(() => {
                const timeEnd = global.nativePerformanceNow();
                console.log(`Test finished in: ${(timeEnd - timeStart)}ms`);
                setTestString(`${timeEnd - timeStart}ms`);
            });


    }




  function testUpdateRealm(realm, amount) {
    const timeStart = global.nativePerformanceNow();
    updateGlucose(realm, amount);
    const timeEnd = global.nativePerformanceNow();
    console.log(`Test finished in: ${timeEnd - timeStart}ms`);
    realm.close();
    console.log("glucose amount added: ", amount);
    setTestString(`${timeEnd - timeStart}ms`);
    
  }
   function testDeleteRealm(realm, amount) {
    const timeStart = global.nativePerformanceNow();
    deleteGlucoseTest(realm, amount);
    const timeEnd = global.nativePerformanceNow();
    console.log(`Test finished in: ${timeEnd - timeStart}ms`);
    realm.close();
    console.log("glucose amount deleted: ", amount);
    setTestString(`${timeEnd - timeStart}ms`);
    
  }
  
  return (
    <View style={styles.container}>
      {/* Other settings components can be added here */}
      <Text style={styles.consoleText}>{testString}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Enter text here"
        onChangeText={handleInputChange}
        value={amount}
        style={styles.consoleText}
      />
      <Button
      title='Just a button'
      onPress={() => console.log("hello")}>
      </Button>
      <Button
      title='init realm'
      onPress={() => initializeRealm()}>
      </Button>
      <Button
      title='Add glucoses'
      onPress={() => testUpdateRealm(realm, amount)}>
      </Button>
      <Button
      title='Delete glucoses'
      onPress={() => testDeleteRealm(realm, amount)}>
      </Button>
        <Button
            title='Test Api Speed 1'
            onPress={() => testAPI(1)}>
        </Button>
        <Button
            title='Test Api Speed 7'
            onPress={() => testAPI(7)}>
        </Button>
        <Button
            title='Test Api Speed 30'
            onPress={() => testAPI(30)}>
        </Button>
        <Button
            title='Test Api Speed 60'
            onPress={() => testAPI(60)}>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consoleText:{
    color: 'white',
    borderRadius: 2,
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
