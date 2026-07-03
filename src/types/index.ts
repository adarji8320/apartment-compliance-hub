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
export type ColourRating = 'green' | 'yellow' | 'red';
export type RegistrationStatus = 'Active' | 'Renewal Due' | 'Pending' | 'Expired';
export type ServiceRequestUrgency = 'urgent' | 'non-urgent';
export type ServiceRequestStatus = 'open' | 'in-progress' | 'resolved';

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
  urgency: ServiceRequestUrgency;
  status: ServiceRequestStatus;
}
