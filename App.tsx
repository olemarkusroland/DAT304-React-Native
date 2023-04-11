import React, {useState, useEffect, useContext} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import Realm from 'realm';

import {realmOpen, deleteRealmFile} from './backend/realm/utils';
import {useBackgroundFetch} from './backend/background-fetch';
import {readLatestGlucose, readLatestInsulin} from './backend/realm/CRUD';
import {AuthenticationContextProvider, AuthenticationContext} from './src/services/Auth/Auth-Context';
import {Navigation} from './src/infastructure/navigation';

const AppContent = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [latestGlucose, setLatestGlucose] = useState<string | null>('No data');
  const [latestInsulin, setLatestInsulin] = useState<string | null>('No data');
  const {isAuthenticated} = useContext(AuthenticationContext);

  useEffect(() => {
    const initializeRealm = async () => {
      const r = await realmOpen();
      setRealm(r);
    };
    if (isAuthenticated) {
      initializeRealm();
    }
  }, [isAuthenticated]);

  useBackgroundFetch(realm);

  return <Navigation />;
};

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AuthenticationContextProvider>
        <AppContent />
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
