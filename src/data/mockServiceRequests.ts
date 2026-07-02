import type { ServiceRequest } from '@/types'

export const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  { id: 'sr1', urgency: 'urgent', status: 'open' },
  { id: 'sr2', urgency: 'urgent', status: 'in-progress' },
  { id: 'sr3', urgency: 'non-urgent', status: 'resolved' },
  { id: 'sr4', urgency: 'urgent', status: 'in-progress' },
  { id: 'sr5', urgency: 'non-urgent', status: 'resolved' },
]
