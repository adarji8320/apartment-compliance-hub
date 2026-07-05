import type { Evaluation, ScoreHistoryEntry, ServiceRequest } from '@/types';

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
