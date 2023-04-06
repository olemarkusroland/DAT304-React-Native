import {WebAuthenticator, authorizeAsync} from 'react-native-app-auth';
import {authorize, refresh, revoke} from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId:
    '324326766371-3hk486vaov742blg7p2sdnjbjqbvusm5.apps.googleusercontent.com',
  redirectUrl: 'com.prejudice://',
  scopes: ['openid', 'profile'],
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
