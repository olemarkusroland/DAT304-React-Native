import React, { useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text} from 'react-native';
import { useGlucoseData, useInsulinData, CurrentTime, LastMonthTime } from './nightscoutAPI.js';
import {
    updateGlucose,
    updateInsulin,
    readLatestInsulin,
    readLatestGlucose,
    useTimer,
    realmOpen,
    isRealmFileExists,
    getRealmPath,
    isRealmEmpty,
} from './realmData.js'

const App = () => {
    const from = useMemo(() => new Date('2023-01-28:00:00:00'), []);
    const to = useMemo(() => new Date('2023-02-01:00:00:00'), []);

   //const response = CurrentTime();
    //const response = useInsulinData({ from, to });
    //console.log(response);
    //isOpenEmpty();
    //addPerson(4, 'John Doe', "ema@gma.com", 30);
    //const lol = getUserById(4);
    //getAllUsers();
    
    callALL();
    
    //const currentTime = CurrentTime();
    //const formattedNow = currentTime.toLocaleString();
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Hello, world!</Text>
        </SafeAreaView>
    );
};


async function callALL() {
   await updateGlucose();
   // await updateInsulin();
    await countInsulin();
}



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

async function isOpenEmpty() {
    const realm = await realmOpen();
    const isEmpty = await isRealmEmpty(realm);
    console.log(`Is the Realm database empty? ${isEmpty}`);
}

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


function lol() {
    const currentTime = new Date();

    const formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}:${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

    return formattedTime;
}
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
