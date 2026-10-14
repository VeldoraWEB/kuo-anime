import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/lib'

type Props = {
  currentEpisode: number
  totalEpisodes: number
  onSelect: (episode: number) => void
  onClose: () => void
  portalTarget?: HTMLElement | null
}

export default function EpisodeGrid({
  currentEpisode,
  totalEpisodes,
  onSelect,
  onClose,
  portalTarget,
}: Props) {
  const activeRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    const active = activeRef.current
    if (!list || !active) return
    list.scrollTop = active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const episodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1)

  const content = (
    <>
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 z-30 cursor-default"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="player-grid absolute left-4 top-16 z-40 flex w-24 flex-col rounded-xl border border-white/10 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-xl sm:w-28"
      >
        <div className="flex max-h-[400px] flex-col gap-0.5 overflow-y-auto [scrollbar-width:thin]">
          {episodes.map((n) => {
            const isActive = n === currentEpisode
            return (
              <button
                key={n}
                ref={isActive ? activeRef : null}
                type="button"
                onClick={() => {
                  onSelect(n)
                  onClose()
                }}
                className={cn(
                  'flex h-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.8)]'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                )}
              >
                {n}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )

  if (!portalTarget) return content
  return createPortal(content, portalTarget)
}