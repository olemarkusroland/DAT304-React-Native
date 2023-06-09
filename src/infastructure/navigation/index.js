import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { realmOpen, deleteRealmFile } from '../../../backend/realm/utils';
import { useBackgroundFetch } from '../../../backend/background-fetch';
import { AuthenticationContext } from '../../services/Auth/Auth-Context';
import { AppNavigator } from './app-navigator';
import { AccountNavigator } from './account-navigation';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';


const Navigation = () => {
    const [realm, setRealm] = useState(null);
    const { isAuthenticated } = useContext(AuthenticationContext);
    useEffect(() => {
        const initializeRealm = async () => {
            const r = await realmOpen();

            setRealm(r);
        };
        if (isAuthenticated) {
            initializeRealm();
        }
    }, [isAuthenticated]);

    //deleteRealmFile()
    useBackgroundFetch(realm, isAuthenticated);

    return (
        <View style={styles.container}>
            <NavigationContainer theme={MyTheme}>
                {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Navigation;
