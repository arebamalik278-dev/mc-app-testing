import axios from 'axios';
import { authStorage } from './authStorage';

// Get the machine's IP address for mobile development
// In production, this would be your actual API domain
const getBaseURL = () => {
  // For development, use the machine's IP instead of localhost
  // This is necessary for mobile emulators/physical devices
  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  
  if (isDev) {
    // Detect local IP address for mobile development
    // This is a common pattern for Expo/React Native development
    return 'http://192.168.1.100:3000/api'; // Replace with your actual IP
  }
  
  return 'https://your-production-api.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await authStorage.getAuthToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      // This would typically dispatch a logout action
      console.log('Unauthorized, redirecting to login...');
    }
    
    return Promise.reject(error);
  }
);

export default api;

// API helper functions
export const apiGet = async <T>(url: string, params?: object) => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

export const apiPost = async <T>(url: string, data?: object) => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const apiPut = async <T>(url: string, data?: object) => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const apiDelete = async <T>(url: string) => {
  const response = await api.delete<T>(url);
  return response.data;
};
