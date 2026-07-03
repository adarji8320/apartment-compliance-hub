import { cn } from '@/lib/utils';
import type { RegistrationStatus } from '@/types';

interface StatusBadgeProps {
  status: RegistrationStatus;
  className?: string;
}

const statusConfig: Record<RegistrationStatus, string> = {
  Active: 'bg-green-100 text-green-800 border border-green-300',
  'Renewal Due': 'bg-orange-100 text-orange-800 border border-orange-300',
  Pending: 'bg-blue-100 text-blue-800 border border-blue-300',
  Expired: 'bg-red-100 text-red-800 border border-red-300',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        statusConfig[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
