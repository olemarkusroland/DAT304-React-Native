// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useMemo} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SafeAreaView,
  StyleSheet,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Text,
  View,
} from 'react-native';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useGlucoseData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInsulinData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CurrentTime,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LastMonthTime,
} from './nightscoutAPI.js';
import {
  updateGlucose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateInsulin,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readLatestInsulin,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readLatestGlucose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useTimer,
  realmOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isRealmFileExists,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRealmPath,
  isRealmEmpty,
} from './realmData.js';
import {Navigation} from './src/infastructure/navigation';
import {AuthenticationContextProvider} from './src/services/Auth/Auth-Context.js';

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const from = useMemo(() => new Date('2023-01-28:00:00:00'), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const to = useMemo(() => new Date('2023-02-01:00:00:00'), []);

  //const response = CurrentTime();
  //const response = useInsulinData({ from, to });
  //console.log(response);
  //isOpenEmpty();
  //addPerson(4, 'John Doe', "ema@gma.com", 30);
  //const lol = getUserById(4);
  //getAllUsers();
  return (
    <View style={{flex: 1}}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </View>
  );

  //callALL();

  //const currentTime = CurrentTime();
  //const formattedNow = currentTime.toLocaleString();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function callALL() {
  await updateGlucose();
  // await updateInsulin();
  await countInsulin();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getUserById(id: number) {
  const realm = await realmOpen();
  const person = realm.objectForPrimaryKey('User', id);

  if (person) {
    console.log(`Found person with ID ${id}:`, person);
    return person;
  } else {
    console.log(`Person with ID ${id} not found.`);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAllUsers() {
  const realm = await realmOpen();
  const users = await realm.objects('GlucoseInfo');

  console.log('All users:', users);
  return users;
}
async function countInsulin() {
  const realm = await realmOpen();

  const insulins = realm.objects('GlucoseInfo');

  console.log(`There are ${insulins.length} entries in the Realm file.`);
  return insulins.length;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function isOpenEmpty() {
  const realm = await realmOpen();
  const isEmpty = await isRealmEmpty(realm);
  console.log(`Is the Realm database empty? ${isEmpty}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function addPerson(id: number, name: string, email: string, age: number) {
  const realm = await realmOpen();

  realm.write(() => {
    realm.create('User', {
      id: id,
      name: name,
      email: email,
      Age: age,
    });
  });

  console.log('Person added to the Realm file');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function lol() {
  const currentTime = new Date();

  const formattedTime = `${currentTime.getFullYear()}-${
    currentTime.getMonth() + 1
  }-${currentTime.getDate()}:${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  return formattedTime;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
