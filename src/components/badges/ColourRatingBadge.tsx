import { cn } from '@/lib/utils'
import type { ColourRating } from '@/types'

interface ColourRatingBadgeProps {
  rating: ColourRating
  className?: string
}

const ratingConfig: Record<ColourRating, { label: string; classes: string }> = {
  green: { label: 'Green', classes: 'bg-green-100 text-green-800 border border-green-300' },
  yellow: { label: 'Yellow', classes: 'bg-yellow-100 text-yellow-800 border border-yellow-300' },
  red: { label: 'Red', classes: 'bg-red-100 text-red-800 border border-red-300' },
}

export function ColourRatingBadge({ rating, className }: ColourRatingBadgeProps) {
  const config = ratingConfig[rating]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        config.classes,
        className
      )}
      aria-label={`Colour rating: ${config.label}`}
    >
      {config.label}
    </span>
  )
}
