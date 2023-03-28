import React, {useContext} from "react";
import {AppNavigator} from "./app-navigator";
import {AccountNavigator} from "./account-navigation";
import {NavigationContainer} from "@react-navigation/native";
import {AuthenticationContext} from "../../services/Auth/Auth-Context";
import {View} from "react-native";
import {styles} from "../../Styles";

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
        <View style={styles.container}>
        <NavigationContainer
        >
            {isAuthenticated ? <AppNavigator /> : <AccountNavigator/>}
        </NavigationContainer>
        </View>
    );
};

