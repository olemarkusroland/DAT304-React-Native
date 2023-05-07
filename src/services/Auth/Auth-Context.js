import React, {useState, createContext} from 'react';
import {GoogleAuthService} from './Auth-service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(false);
    const [authState, setAuthState] = useState({
        user: null,
        accessToken: null,
        refreshToken: null
    });

    const handleLogin = async () => {
    try {
        const Token = await GoogleAuthService.login();
        const accessToken = await Token.accessToken;
        const refreshToken = await Token.refreshToken;
      const userData = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      ).then(res => res.json());
        setAuthState({
            user: userData,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (e) {
      setError(e);
    }
  };

    console.log(!!authState.user);
    return (
    <AuthenticationContext.Provider
      value={{
          isAuthenticated: !!authState.user,
          user: authState.user,
          error,
          handleLogin,
          accessToken: authState.accessToken,
          refreshToken: authState.refreshToken,
          needRefresh,
          setNeedRefresh,
          setAccessToken: (accessToken) => setAuthState((prevState) => ({ ...prevState, accessToken }))

      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
