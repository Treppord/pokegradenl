import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '@/types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const api = {
  get: <T = any>(url: string, config?: any): Promise<AxiosResponse<APIResponse<T>>> =>
    apiClient.get(url, config),
  
  post: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<APIResponse<T>>> =>
    apiClient.post(url, data, config),
  
  put: <T = any>(url: string, data: any, config?: any): Promise<AxiosResponse<APIResponse<T>>> =>
    apiClient.put(url, data, config),
  
  delete: <T = any>(url: string, config?: any): Promise<AxiosResponse<APIResponse<T>>> =>
    apiClient.delete(url, config),
  
  patch: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<APIResponse<T>>> =>
    apiClient.patch(url, data, config),
};

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default apiClient;
