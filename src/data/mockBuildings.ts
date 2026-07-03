import type { Building } from '@/types';
import { calculateAnnualFee } from '@/lib/utils';
import { CITY_NAME } from '@/lib/constants';

export const MOCK_BUILDINGS: Building[] = [
  {
    id: 'b1',
    address: '13 Alchemist Lane',
    city: CITY_NAME,
    postalCode: 'A1A A1A',
    storeys: 8,
    units: 45,
    colourRating: 'green',
    status: 'Active',
    score: 82,
    renewalDate: '2026-07-31',
    annualFee: calculateAnnualFee(45),
  },
  {
    id: 'b2',
    address: '88 Neon Ribbon Boulevard',
    city: CITY_NAME,
    postalCode: 'A1A A1A',
    storeys: 5,
    units: 28,
    colourRating: 'yellow',
    status: 'Renewal Due',
    score: 61,
    renewalDate: '2026-07-31',
    annualFee: calculateAnnualFee(28),
  },
  {
    id: 'b3',
    address: '1 Master’s Plaza',
    city: CITY_NAME,
    postalCode: 'A1A A1A',
    storeys: 12,
    units: 67,
    colourRating: 'red',
    status: 'Active',
    score: 44,
    renewalDate: '2026-07-31',
    annualFee: calculateAnnualFee(67),
  },
];
