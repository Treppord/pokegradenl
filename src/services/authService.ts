import { api, handleApiError } from './api';
import { AuthResponse, LoginForm, RegisterForm, User } from '@/types';

export const authService = {
  // Login user
  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { user, token, refreshToken } = response.data.data;
      
      // Store tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Register user
  register: async (userData: RegisterForm): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      const { user, token, refreshToken } = response.data.data;
      
      // Store tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage regardless of API call success
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Refresh token
  refreshToken: async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<{ token: string }>('/auth/refresh', {
        refresh_token: refreshToken,
      });
      
      const newToken = response.data.data.token;
      localStorage.setItem('auth_token', newToken);
      
      return newToken;
    } catch (error) {
      // If refresh fails, logout user
      authService.logout();
      throw new Error(handleApiError(error));
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  },

  // Get stored user
  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.patch('/auth/password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await api.post('/auth/password/reset-request', { email });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Reset password with token
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/password/reset', {
        token,
        new_password: newPassword,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
