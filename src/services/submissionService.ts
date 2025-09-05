import { api, handleApiError } from './api';
import apiClient from './api';
import { Submission, SubmissionForm, ServiceTierInfo, TrackingInfo } from '@/types';

export const submissionService = {
  // Get service tiers and pricing
  getServiceTiers: async (): Promise<ServiceTierInfo[]> => {
    try {
      const response = await api.get<ServiceTierInfo[]>('/services/tiers');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Create new submission
  createSubmission: async (submissionData: SubmissionForm): Promise<Submission> => {
    try {
      const response = await api.post<Submission>('/submissions', submissionData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user submissions
  getUserSubmissions: async (userId?: string): Promise<Submission[]> => {
    try {
      const url = userId ? `/submissions?user_id=${userId}` : '/submissions';
      const response = await api.get<Submission[]>(url);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get submission by ID
  getSubmissionById: async (id: string): Promise<Submission> => {
    try {
      const response = await api.get<Submission>(`/submissions/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Track submission by ID
  trackSubmission: async (id: string): Promise<TrackingInfo> => {
    try {
      const response = await api.get<TrackingInfo>(`/submissions/${id}/track`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update submission
  updateSubmission: async (id: string, updateData: Partial<Submission>): Promise<Submission> => {
    try {
      const response = await api.patch<Submission>(`/submissions/${id}`, updateData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Cancel submission
  cancelSubmission: async (id: string): Promise<void> => {
    try {
      await api.patch(`/submissions/${id}/cancel`, {});
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Calculate submission cost
  calculateCost: async (cards: any[], serviceTier: string): Promise<{ total: number; breakdown: any }> => {
    try {
      const response = await api.post('/submissions/calculate-cost', {
        cards,
        service_tier: serviceTier,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Upload card images
  uploadCardImages: async (submissionId: string, images: FileList): Promise<string[]> => {
    try {
      const formData = new FormData();
      Array.from(images).forEach((file, index) => {
        formData.append(`image_${index}`, file);
      });

      const response = await api.post(`/submissions/${submissionId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get submission receipt
  getSubmissionReceipt: async (id: string): Promise<Blob> => {
    try {
      const response = await apiClient.get(`/submissions/${id}/receipt`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get grading certificate
  getGradingCertificate: async (cardId: string): Promise<Blob> => {
    try {
      const response = await apiClient.get(`/cards/${cardId}/certificate`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
