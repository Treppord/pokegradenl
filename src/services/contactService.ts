import { api, handleApiError } from './api';
import { ContactForm } from '@/types';

export const contactService = {
  // Send contact form
  sendContactMessage: async (formData: ContactForm): Promise<void> => {
    try {
      await api.post('/contact/message', formData);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get FAQ items
  getFAQItems: async (): Promise<any[]> => {
    try {
      const response = await api.get('/content/faq');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email: string): Promise<void> => {
    try {
      await api.post('/newsletter/subscribe', { email });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get company information
  getCompanyInfo: async (): Promise<any> => {
    try {
      const response = await api.get('/content/company-info');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get privacy policy
  getPrivacyPolicy: async (): Promise<string> => {
    try {
      const response = await api.get('/content/privacy-policy');
      return response.data.data.content;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get terms and conditions
  getTermsAndConditions: async (): Promise<string> => {
    try {
      const response = await api.get('/content/terms-conditions');
      return response.data.data.content;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
