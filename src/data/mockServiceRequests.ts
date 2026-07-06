import type { ComplianceItem, Evaluation, ScoreHistoryEntry, ServiceRequest } from '@/types';

export const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  { id: 'sr1', urgency: 'urgent', status: 'open' },
  { id: 'sr2', urgency: 'urgent', status: 'in-progress' },
  { id: 'sr3', urgency: 'non-urgent', status: 'resolved' },
  { id: 'sr4', urgency: 'urgent', status: 'in-progress' },
  { id: 'sr5', urgency: 'non-urgent', status: 'resolved' },
];

export const MOCK_EVALUATIONS: Evaluation[] = [
  {
    id: 'eval1',
    buildingId: 'b1',
    date: '2026-03-15',
    totalScore: 82,
    maxScore: 100,
    categories: [
      { name: 'Exterior', score: 18, maxScore: 20 },
      { name: 'Interior', score: 17, maxScore: 20 },
      { name: 'Mechanical', score: 16, maxScore: 20 },
      { name: 'Units', score: 16, maxScore: 20 },
      { name: 'Security', score: 15, maxScore: 20 },
    ],
    colourRating: 'green',
    evaluatorName: 'Officer M. Chen',
    nextEvaluationDate: '2027-03-15',
  },
  {
    id: 'eval2',
    buildingId: 'b2',
    date: '2026-02-10',
    totalScore: 61,
    maxScore: 100,
    categories: [
      { name: 'Exterior', score: 12, maxScore: 20 },
      { name: 'Interior', score: 13, maxScore: 20 },
      { name: 'Mechanical', score: 12, maxScore: 20 },
      { name: 'Units', score: 13, maxScore: 20 },
      { name: 'Security', score: 11, maxScore: 20 },
    ],
    colourRating: 'yellow',
    evaluatorName: 'Officer T. Williams',
    nextEvaluationDate: '2027-02-10',
  },
  {
    id: 'eval3',
    buildingId: 'b3',
    date: '2026-01-20',
    totalScore: 44,
    maxScore: 100,
    categories: [
      { name: 'Exterior', score: 9, maxScore: 20 },
      { name: 'Interior', score: 8, maxScore: 20 },
      { name: 'Mechanical', score: 9, maxScore: 20 },
      { name: 'Units', score: 9, maxScore: 20 },
      { name: 'Security', score: 9, maxScore: 20 },
    ],
    colourRating: 'red',
    evaluatorName: 'Officer S. Patel',
    nextEvaluationDate: '2026-07-20',
  },
];

export const MOCK_SCORE_HISTORY: Record<string, ScoreHistoryEntry[]> = {
  b1: [
    { date: '2026-03-15', score: 82 },
    { date: '2025-03-10', score: 78 },
    { date: '2024-03-05', score: 74 },
  ],
  b2: [
    { date: '2026-02-10', score: 61 },
    { date: '2025-02-08', score: 58 },
    { date: '2024-02-12', score: 63 },
  ],
  b3: [
    { date: '2026-01-20', score: 44 },
    { date: '2025-01-18', score: 52 },
    { date: '2024-01-15', score: 49 },
  ],
};

function buildComplianceItems(completedIds: string[], notes: Record<string, string> = {}) {
  const items: Omit<ComplianceItem, 'completed' | 'notes'>[] = [
    {
      id: 'c1',
      label: 'Tenant Notification Board posted',
      description: 'Visible notification board in lobby with required postings',
      templateUrl: '#',
    },
    {
      id: 'c2',
      label: 'Pest inspection records (every 30 days)',
      description: 'Maintain pest control inspection records and ensure monthly inspections',
      templateUrl: '#',
    },
    {
      id: 'c3',
      label: 'Cleaning plan maintained',
      description: 'Written cleaning and maintenance plan for all common areas',
      templateUrl: '#',
    },
    {
      id: 'c4',
      label: 'State of Good Repair Capital Plan',
      description: 'Multi-year capital plan for building systems and components',
      templateUrl: '#',
    },
    {
      id: 'c5',
      label: 'Vital Service Disruption Plan',
      description: 'Plan for interruptions to heat, hot water, elevator, and other vital services',
      templateUrl: '#',
    },
    {
      id: 'c6',
      label: 'Voluntary Tenant Contact List',
      description: 'Maintain optional list of tenant contacts for emergency notifications',
      templateUrl: '#',
    },
    {
      id: 'c7',
      label: 'Electrical Maintenance Plan',
      description: 'Documented plan for electrical system inspections and maintenance',
      templateUrl: '#',
    },
    {
      id: 'c8',
      label: 'Certified tradesperson records',
      description: 'Maintain records of all certified tradespeople performing work',
      templateUrl: '#',
    },
    {
      id: 'c9',
      label: 'Colour-coded sign posted',
      description: 'Post required colour-coded sign (Green/Yellow/Red) at main entrance',
      isNew: true,
      templateUrl: '#',
    },
    {
      id: 'c10',
      label: 'Emergency contact sign posted',
      description: 'Sign with 24/7 emergency contact number posted at main entrance',
      templateUrl: '#',
    },
    {
      id: 'c11',
      label: 'Hot weather plan posted',
      description: 'Plan for extreme heat events and tenant communication',
      templateUrl: '#',
    },
  ];

  return items.map((item) => ({
    ...item,
    completed: completedIds.includes(item.id),
    notes: notes[item.id] ?? '',
  }));
}

export const MOCK_COMPLIANCE_ITEMS: Record<string, ComplianceItem[]> = {
  b1: buildComplianceItems(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c10'], {
    c2: 'Last inspection: June 1, 2026',
  }),
  b2: buildComplianceItems(['c1', 'c2', 'c3', 'c6', 'c8', 'c10'], {
    c2: 'Last inspection: June 1, 2026',
  }),
  b3: buildComplianceItems(['c1', 'c6', 'c8'], { c2: 'Overdue — last inspection: March 2025' }),
};
