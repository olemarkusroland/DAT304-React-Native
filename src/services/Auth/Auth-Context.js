import React, {useState, createContext} from 'react';
import {GoogleAuthService} from './Auth-service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [accessToken, setaccessToken] = useState(null);
    const [refreshToken, setrefreshToken] = useState(null);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
        const Token = await GoogleAuthService.login();
        const accessToken = await Token.accessToken;
        console.log(accessToken);
        const refreshToken = await Token.refreshToken;
        console.log(refreshToken);
      const userData = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      ).then(res => res.json());
      console.log('Google user data', userData);
        setUser(userData);
        setaccessToken(accessToken);
        setrefreshToken(refreshToken);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        handleLogin,
        accessToken,
        refreshToken,
        setaccessToken,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
