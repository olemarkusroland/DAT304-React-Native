import React, { useState, createContext } from "react";
import {loginRequest} from "./Auth-service";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

export const AuthenticationContext = createContext();



export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    auth.onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    });



    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password)
            .then((u) => {
                setUser(u);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e);
            });
    };

    const onRegister = (email,password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const onLogout = () => {
        auth
            .signOut()
            .then(() => {
                setUser(null)
                setError(null);
            })
            .catch(error => alert(error.message))
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
