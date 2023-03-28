import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth} from "../../../services/firebase";
import { AuthenticationContext} from "../../../services/Auth/Auth-Context";

export const RegisterScreen = ({navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { onRegister, error } = useContext(AuthenticationContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => onRegister(email,password)}
                    style={styles.button}
                    title={'Register'}
                ><Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                    title={'Back'}
                ><Text>Back</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFEEEE"

    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#EBD8C3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#F7E9D7',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})
