import React, {useContext, useState} from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {AuthenticationContext} from "../../../services/Auth/Auth-Context";


export const AccountScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {onLogin, error} = useContext(AuthenticationContext);

    return (
        <View style={local.container}>
            <View>
                <KeyboardAvoidingView
                    style={local.container}
                    behavior="padding"
                >
                    <View style={local.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={local.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={local.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={local.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => onLogin(email, password)}
                            style={local.button}
                            title={'Login'}
                        ><Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>If you do</Text>
                    <TouchableOpacity
                        title={'Register'}
                        style={local.button}
                        onPress={() => navigation.navigate("Register")}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const local = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEEEE',
        flexWrap: "wrap",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#F7E9D7',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
