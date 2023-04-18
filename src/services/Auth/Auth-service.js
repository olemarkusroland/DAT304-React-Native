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
      return result;
    } catch (error) {
      console.error('Authorization error:', error);
      throw error;
    }
  },
};
export async function refreshAccessToken(refreshToken) {
    try {
        const refreshedTokens = await refresh(config, {
            refreshToken: refreshToken,
        });
        console.log('Access token refreshed...');
        return refreshedTokens.accessToken;
    } catch (error) {
        console.error('Access token refresh error:', error);
        throw error;
    }
}
