import { useState, useEffect } from 'react';
import { submissionService } from '@/services/submissionService';
import { Submission, SubmissionForm, ServiceTierInfo, TrackingInfo } from '@/types';

export function useSubmissions(userId?: string) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await submissionService.getUserSubmissions(userId);
      setSubmissions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submissions';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [userId]);

  const createSubmission = async (submissionData: SubmissionForm) => {
    try {
      setError(null);
      const newSubmission = await submissionService.createSubmission(submissionData);
      setSubmissions(prev => [newSubmission, ...prev]);
      return newSubmission;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create submission';
      setError(errorMessage);
      throw err;
    }
  };

  const updateSubmission = async (id: string, updateData: Partial<Submission>) => {
    try {
      setError(null);
      const updatedSubmission = await submissionService.updateSubmission(id, updateData);
      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? updatedSubmission : sub)
      );
      return updatedSubmission;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update submission';
      setError(errorMessage);
      throw err;
    }
  };

  const cancelSubmission = async (id: string) => {
    try {
      setError(null);
      await submissionService.cancelSubmission(id);
      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: 'cancelled' } : sub)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel submission';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    submissions,
    loading,
    error,
    createSubmission,
    updateSubmission,
    cancelSubmission,
    refetch: fetchSubmissions,
    clearError: () => setError(null),
  };
}

export function useSubmission(id: string) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await submissionService.getSubmissionById(id);
      setSubmission(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submission';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubmission();
    }
  }, [id]);

  return {
    submission,
    loading,
    error,
    refetch: fetchSubmission,
    clearError: () => setError(null),
  };
}

export function useServiceTiers() {
  const [serviceTiers, setServiceTiers] = useState<ServiceTierInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceTiers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await submissionService.getServiceTiers();
        setServiceTiers(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch service tiers';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceTiers();
  }, []);

  return {
    serviceTiers,
    loading,
    error,
    clearError: () => setError(null),
  };
}

export function useTrackSubmission(id: string) {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrackingInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await submissionService.trackSubmission(id);
      setTrackingInfo(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tracking information';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrackingInfo();
    }
  }, [id]);

  return {
    trackingInfo,
    loading,
    error,
    refetch: fetchTrackingInfo,
    clearError: () => setError(null),
  };
}

export function useCostCalculator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCost = async (cards: any[], serviceTier: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await submissionService.calculateCost(cards, serviceTier);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate cost';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    calculateCost,
    loading,
    error,
    clearError: () => setError(null),
  };
}
