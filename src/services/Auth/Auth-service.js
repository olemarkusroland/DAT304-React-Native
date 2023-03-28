import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";


export const loginRequest = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))
