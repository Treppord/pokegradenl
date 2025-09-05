// API Response Types
export interface APIResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// Card Types
export interface Card {
  id: string;
  name: string;
  set: string;
  cardNumber: string;
  variant?: string;
  language: string;
  condition: string;
  value?: number;
  imageUrl?: string;
}

export interface GradedCard extends Card {
  gradeId: string;
  grade: number;
  subgrades: {
    centering: number;
    corners: number;
    edges: number;
    surface: number;
  };
  authenticityScore: number;
  gradedAt: string;
  graderNotes?: string;
  certificateUrl: string;
}

// Submission Types
export type SubmissionStatus = 
  | 'draft' 
  | 'submitted' 
  | 'received' 
  | 'processing' 
  | 'graded' 
  | 'shipped' 
  | 'completed' 
  | 'cancelled';

export type ServiceTier = 'standard' | 'value' | 'premium';

export interface Submission {
  id: string;
  userId: string;
  status: SubmissionStatus;
  serviceTier: ServiceTier;
  cards: Card[];
  gradedCards?: GradedCard[];
  totalValue: number;
  totalFee: number;
  shippingAddress: Address;
  returnAddress: Address;
  trackingNumber?: string;
  returnTrackingNumber?: string;
  submittedAt: string;
  expectedCompletionAt?: string;
  completedAt?: string;
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
}

// Service Types
export interface ServiceTierInfo {
  id: ServiceTier;
  name: string;
  description: string;
  turnaroundDays: number;
  pricePerCard: number;
  maxValue: number;
  features: string[];
  recommended?: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionForm {
  serviceTier: ServiceTier;
  cards: Card[];
  shippingAddress: Address;
  returnAddress: Address;
  notes?: string;
}

// Auth Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Order Tracking
export interface TrackingInfo {
  status: SubmissionStatus;
  timeline: TrackingEvent[];
  estimatedCompletion?: string;
  currentStep: number;
  totalSteps: number;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location?: string;
}
