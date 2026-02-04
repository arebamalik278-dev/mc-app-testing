import * as ExpoSecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const authStorage = {
  // Save auth token
  setAuthToken: async (token: string) => {
    try {
      await ExpoSecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw error;
    }
  },

  // Get auth token
  getAuthToken: async (): Promise<string | null> => {
    try {
      return await ExpoSecureStore.getItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  // Remove auth token
  removeAuthToken: async () => {
    try {
      await ExpoSecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing auth token:', error);
      throw error;
    }
  },

  // Save refresh token
  setRefreshToken: async (token: string) => {
    try {
      await ExpoSecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving refresh token:', error);
      throw error;
    }
  },

  // Get refresh token
  getRefreshToken: async (): Promise<string | null> => {
    try {
      return await ExpoSecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  // Save user data
  setUserData: async (userData: string) => {
    try {
      await ExpoSecureStore.setItemAsync(USER_DATA_KEY, userData);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  },

  // Get user data
  getUserData: async (): Promise<string | null> => {
    try {
      return await ExpoSecureStore.getItemAsync(USER_DATA_KEY);
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Clear all auth data
  clearAll: async () => {
    try {
      await ExpoSecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await ExpoSecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      await ExpoSecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  },
};

// Auth helper functions
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await authStorage.getAuthToken();
  return !!token;
};
