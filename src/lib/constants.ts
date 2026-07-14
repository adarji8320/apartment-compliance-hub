export const APP_NAME = 'Apartment Compliance Hub';
export const APP_TAGLINE = 'Building Standards & Compliance Management';
export const CITY_NAME = 'Metropolis';
export const CONTACT_EMAIL = 'support@compliancehub.fake';
export const CONTACT_PHONE = '555-123-4567';

export const FEES = {
  annualPerUnit: 30.82,
  buildingAuditAdmin: 215.0,
  auditInspectionPerHour: 95.0,
  reEvaluation: 350.0,
  signReplacementMin: 75.0,
  signReplacementMax: 150.0,
};

export const FINES = {
  failToRegister: 600.0,
  registrationNotUpToDate: 400.0,
  noNotificationBoard: 300.0,
  urgentRequestNotAnswered: 500.0,
  noPestInspection: 350.0,
  rentingWithPests: 1000.0,
  courtConvictionMax: 100000.0,
};

export const HARDCODED_CREDENTIALS = {
  loginId: '12345',
  pin: '6789',
  ownerName: 'John Smith',
  companyName: 'Smith Properties Inc.',
};

export const AUTH_STORAGE_KEY = 'apartment_compliance_hub_auth';

export const SERVICE_REQUEST_TYPES = [
  { value: 'pest-complaint', label: 'Pest complaint', urgency: 'urgent' as const },
  { value: 'no-heat', label: 'No heat / insufficient heat', urgency: 'urgent' as const },
  { value: 'no-hot-water', label: 'No hot water', urgency: 'urgent' as const },
  { value: 'elevator-outage', label: 'Elevator outage', urgency: 'urgent' as const },
  { value: 'electrical-issue', label: 'Electrical issue', urgency: 'urgent' as const },
  { value: 'cooling-issue', label: 'Cooling issue', urgency: 'non-urgent' as const },
  { value: 'general-maintenance', label: 'General maintenance', urgency: 'non-urgent' as const },
  { value: 'notification-board', label: 'Notification board', urgency: 'non-urgent' as const },
  { value: 'other', label: 'Other', urgency: 'non-urgent' as const },
] as const;

export const WARDS = [
  'Ward 1 - Harborview',
  'Ward 2 - Old Mill District',
  'Ward 3 - Cedar Heights',
  'Ward 4 - Riverside',
  'Ward 5 - North Metropolis',
  'Ward 6 - Lakeside',
];
