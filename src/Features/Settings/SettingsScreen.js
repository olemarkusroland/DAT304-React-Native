import React, {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Button} from 'react-native';
import {AuthenticationContext} from '../../services/Auth/Auth-Context';
import { updateGlucose, updateGlucoseLog, deleteGlucoseTest, createOrUpdateFood} from '../../../backend/realm/CRUD';
import { realmOpen } from '../../../backend/realm/utils';

export const SettingScreen = ({navigation}) => {
  const {onLogout, user} = useContext(AuthenticationContext);
  const [realm, setRealm] = useState(null);
  const [testString, setTestString] = useState('Placeholder');
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

  async function testUpdateRealm(realm, amount) {
    const totaltime = await updateGlucose(realm, amount);
    realm.close();
    console.log("glucose amount added: ", amount);
    setTestString(`${totaltime}ms`);
  }

  async function testDeleteRealm(realm, amount) {
    const totaltime = await deleteGlucoseTest(realm, amount);
    realm.close();
    console.log("glucose amount deleted: ", amount);
    setTestString(`${totaltime}ms`);
}
  async function addFood(realm, amount){
    for (let i = 1; i <= amount; i++) {
      await createOrUpdateFood(realm, `Example food ${i}`, i * 1000, i * 100, i * 10, i);
    }
    console.log("Added Food");
  }
//const hello = updateGlucose(realm, 10);

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
      title='Add food amount'
      onPress={() => console.log(addFood(realm, amount))}>
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
      onPress={() =>testDeleteRealm(realm, amount)}>
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
