import {WebAuthenticator, authorizeAsync} from 'react-native-app-auth';
import {authorize, refresh, revoke} from 'react-native-app-auth';
import GoogleFit, { Scopes } from 'react-native-google-fit';
const config = {
  issuer: 'https://accounts.google.com',
  clientId:
    '324326766371-3hk486vaov742blg7p2sdnjbjqbvusm5.apps.googleusercontent.com',
  redirectUrl: 'com.prejudice://',
    scopes: ['openid', 'profile', Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_NUTRITION_READ,],
  additionalParameters: {prompt: 'consent'},
};
export const GoogleAuthService = {
  async login() {
    try {
      const result = await authorize(config);
      console.log('Authorization successful:', result);
      return result.accessToken;
    } catch (error) {
      console.error('Authorization error:', error);
      throw error;
    }
  },
};
