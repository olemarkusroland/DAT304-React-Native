import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();


// web: 210114543828-1gaj155it2qrv2vrbfj5biisnh6jtmla.apps.googleusercontent.com
// iOS: 210114543828-b9u1sl04cabgk23j2dor9uk38m4o7e1b.apps.googleusercontent.com
// Android: 210114543828-7vae1o03e9mt6c0ncm48r3r3c13luef8.apps.googleusercontent.com

const LoginScreen = ({ navigation }) => {
    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "210114543828-1gaj155it2qrv2vrbfj5biisnh6jtmla.apps.googleusercontent.com",
      iosClientId: "210114543828-b9u1sl04cabgk23j2dor9uk38m4o7e1b.apps.googleusercontent.com",
      androidClientId: "210114543828-7vae1o03e9mt6c0ncm48r3r3c13luef8.apps.googleusercontent.com"
    });

    React.useEffect(() => {
      if(response?.type === "success"){
        console.log(response.authentication.accessToken);
        setAccessToken(response.authentication.accessToken);
        accessToken && fetchUserInfo();
        console.log(user);
        // navigation.replace("TabNavigator",{screen: "Home"});
      }
    }, [response, accessToken])

  async function fetchUserInfo() {
    let reponse = await fetch("https://googleapis.com/userinfo/v2/me", {
      headers: { Authorization: 'Bearer ${accessToken}'}
    });
    const useInfo = await reponse.json();
    console.log(useInfo);
    setUser(useInfo);
  }

  return (
    <View style={styles.container}>
    {user && <ShowUserInfo />}
    {user === null &&
        <>
        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome Test222</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
          }} 
      >
        <Image source={require("../btn.png")} style={{width: 300, height: 40}} />
      </TouchableOpacity>
      </>
    }
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
