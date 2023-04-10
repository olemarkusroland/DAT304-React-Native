import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import Realm from 'realm';

import {realmOpen, deleteRealmFile} from './backend/realm/utils';
import {useBackgroundFetch} from './backend/background-fetch';
import {readLatestGlucose, readLatestInsulin} from './backend/realm/CRUD';
import {AuthenticationContextProvider} from './src/services/Auth/Auth-Context';
import {Navigation} from './src/infastructure/navigation';

const App = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [latestGlucose, setLatestGlucose] = useState<string | null>('No data');
  const [latestInsulin, setLatestInsulin] = useState<string | null>('No data');

  useEffect(() => {
    const initializeRealm = async () => {
      await deleteRealmFile();
      const r = await realmOpen();

      setRealm(r);
    };
    initializeRealm();
  }, []);

  useEffect(() => {
    const fetchLatestData = async () => {
      if (realm) {
        const glucose = await readLatestGlucose(realm);
        const insulin = await readLatestInsulin(realm);

        setLatestGlucose(glucose);
        setLatestInsulin(insulin);
      } else {
        console.log('fetchLatestData: No realm');
      }
    };

    // Set an interval to fetch data every 15 seconds
    const intervalId = setInterval(() => {
      fetchLatestData();
    }, 15 * 1000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [realm]);

  useBackgroundFetch(realm);

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
