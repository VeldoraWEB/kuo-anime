import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/shared/lib'

type Props = {
  qualities: string[]
  currentQuality: string
  onQualityChange: (q: string) => void
}

export default function QualityMenu({ qualities, currentQuality, onQualityChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg px-2 py-1.5 font-mono text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
      >
        {currentQuality}
        <ChevronDown className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <ul className="absolute bottom-full right-0 mb-2 w-32 rounded-xl border border-white/10 bg-zinc-950/90 p-1 shadow-2xl backdrop-blur-xl">
          {[...qualities].reverse().map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => {
                  onQualityChange(q)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-1.5 font-mono text-xs transition-colors',
                  q === currentQuality
                    ? 'bg-violet-500/15 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}
              >
                {q}
                {q === currentQuality && <Check className="size-3.5 text-cyan-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}