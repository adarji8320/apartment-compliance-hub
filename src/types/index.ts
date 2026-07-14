import type { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface AuthUser {
  loginId: string;
  ownerName: string;
  companyName: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (loginId: string, pin: string) => boolean;
  logout: () => void;
}

export type BuildingType = 'rental-apartment' | 'mixed-use' | 'other';
export type CardType = 'visa' | 'mastercard' | 'amex';
export type ColourRating = 'green' | 'yellow' | 'red';
export type RegistrationStatus = 'Active' | 'Renewal Due' | 'Pending' | 'Expired';
export type ServiceRequestUrgency = 'urgent' | 'non-urgent';
export type ServiceRequestStatus = 'open' | 'in-progress' | 'resolved';
export type ServiceRequestType =
  | 'pest-complaint'
  | 'no-heat'
  | 'no-hot-water'
  | 'elevator-outage'
  | 'electrical-issue'
  | 'cooling-issue'
  | 'general-maintenance'
  | 'notification-board'
  | 'other';

export interface Building {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  storeys: number;
  units: number;
  colourRating: ColourRating;
  status: RegistrationStatus;
  score: number;
  renewalDate: string;
  annualFee: number;
}

export interface ServiceRequest {
  id: string;
  buildingId: string;
  buildingAddress: string;
  type: ServiceRequestType;
  urgency: ServiceRequestUrgency;
  description: string;
  unitNumber: string;
  tenantContact: string;
  dateSubmitted: string;
  responseDue: string;
  status: ServiceRequestStatus;
}

export interface EvaluationCategory {
  name: string;
  score: number;
  maxScore: number;
}

export interface Evaluation {
  id: string;
  buildingId: string;
  date: string;
  totalScore: number;
  maxScore: number;
  categories: EvaluationCategory[];
  colourRating: ColourRating;
  evaluatorName: string;
  nextEvaluationDate: string;
}

export interface ScoreHistoryEntry {
  date: string;
  score: number;
}

export interface ComplianceItem {
  id: string;
  label: string;
  description: string;
  isNew?: boolean;
  completed: boolean;
  notes: string;
  templateUrl?: string;
}
