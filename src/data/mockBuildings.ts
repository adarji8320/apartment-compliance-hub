import type { Building } from '@/types';
import { calculateAnnualFee } from '@/lib/utils';

export const MOCK_BUILDINGS: Building[] = [
  {
    id: 'b1',
    address: '13 Alchemist Lane',
    units: 45,
    colourRating: 'green',
    status: 'Active',
    score: 82,
    renewalDate: 'July 31, 2026',
    annualFee: calculateAnnualFee(45),
  },
  {
    id: 'b2',
    address: '88 Neon Ribbon Boulevard',
    units: 28,
    colourRating: 'yellow',
    status: 'Renewal Due',
    score: 61,
    renewalDate: 'July 31, 2026',
    annualFee: calculateAnnualFee(28),
  },
  {
    id: 'b3',
    address: '1 Master’s Plaza',
    units: 67,
    colourRating: 'red',
    status: 'Active',
    score: 44,
    renewalDate: 'July 31, 2026',
    annualFee: calculateAnnualFee(67),
  },
];
