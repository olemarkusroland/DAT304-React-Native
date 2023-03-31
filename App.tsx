import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { realmOpen, isRealmEmpty } from './backend/realm/utils.js'
import { updateGlucose } from './backend/realm/CRUD.js';
import { BackgroundTest } from './backend/background-fetch.js';

import './backend/realm/testCRUD.js';

const App = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Hello World!</Text>
        </SafeAreaView>
    );
};

async function callAll() {
    await updateGlucose();
    await countGlucose();
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

async function countGlucose() {
    const realm = await realmOpen();
    const glucoses = realm.objects('GlucoseInfo');

    console.log(`There are ${glucoses.length} entries in the Realm file.`);
    return glucoses.length;
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
