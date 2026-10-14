import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/shared/lib'

type Props = {
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md'
  label?: string
}

export default function StarRating({
  value,
  onChange,
  readOnly,
  size = 'sm',
  label = 'Rating',
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null)
  const display = hovered ?? value
  const iconSize = size === 'md' ? 'size-5' : 'size-4'
  const STARS = [1, 2, 3, 4, 5] as const

  if (readOnly) {
    return (
      <div className="flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
        {STARS.map((n) => (
          <Star
            key={n}
            className={cn(iconSize, n <= value ? 'fill-amber-400 text-amber-400' : 'text-zinc-700')}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHovered(null)}
    >
      {STARS.map((n) => {
        const active = n <= display
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => setHovered(n)}
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered(null)}
            onClick={() => onChange?.(n)}
            className="rounded p-0.5 transition-transform duration-150 hover:scale-125 active:scale-90"
          >
            <Star
              className={cn(
                iconSize,
                'transition-colors duration-150',
                active
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                  : 'text-zinc-600 hover:text-zinc-400',
              )}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </div>
  )
}