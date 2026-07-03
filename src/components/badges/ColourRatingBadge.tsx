import { cn } from '@/lib/utils';
import type { ColourRating } from '@/types';

interface ColourRatingBadgeProps {
  rating: ColourRating;
  className?: string;
  showLabel?: boolean;
}

const ratingConfig: Record<ColourRating, { label: string; classes: string; dot: string }> = {
  green: {
    label: 'Green',
    classes: 'bg-green-100 text-green-800 border border-green-300',
    dot: 'bg-green-600',
  },
  yellow: {
    label: 'Yellow',
    classes: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    dot: 'bg-yellow-600',
  },
  red: {
    label: 'Red',
    classes: 'bg-red-100 text-red-800 border border-red-300',
    dot: 'bg-red-600',
  },
};

export function ColourRatingBadge({ rating, className, showLabel = true }: ColourRatingBadgeProps) {
  const config = ratingConfig[rating];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        config.classes,
        className,
      )}
      aria-label={`Colour rating: ${config.label}`}
    >
      <span className={cn('h-2 w-2 rounded-full', config.dot)} aria-hidden="true" />
      {showLabel && config.label}
    </span>
  );
}
