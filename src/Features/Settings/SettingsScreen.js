import React, {useContext} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {AuthenticationContext} from "../../services/Auth/Auth-Context";
import {styles} from "../../Styles";

export const SettingScreen = ({navigation}) => {
    const {onLogout, user} = useContext(AuthenticationContext);


    return (
        <View styles={styles.container}>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AddRoom")}
            >
                <Text style={styles.buttonText}>Add Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DeleteRoom")}
            >
                <Text style={styles.buttonText}>Delete Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={onLogout}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

        </View>
    );
}


