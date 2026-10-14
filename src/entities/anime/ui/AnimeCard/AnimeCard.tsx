import { useNavigate } from 'react-router-dom'
import { Play, Plus, Star, Check } from 'lucide-react'
import { useAuthStore, useIsInMyList, useToggleMyList } from '@/entities/user'
import type { Anime } from '../../model/types'
import { getAssetUrl } from '@/shared/lib'

type Props = {
  anime: Anime
  onOpen: () => void
}

export default function AnimeCard({ anime, onOpen }: Props) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const inList = useIsInMyList(anime.id)
  const toggle = useToggleMyList()

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      navigate('/login')
      return
    }
    toggle.mutate({ animeId: anime.id, inList })
  }

  return (
    <article 
       className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-300 hover:z-10 hover:scale-105 hover:border-violet-500/40 hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)]">
      <img
        src={getAssetUrl(anime.image)}
        alt={`${anime.title} poster`}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-zinc-950/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
      {(anime.ratingCount ?? 0) > 0 && (
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {anime.rating?.toFixed(1) ?? '0.0'}
        </div>
      )}

      <a
        href={`${import.meta.env.BASE_URL}anime/${anime.slug}`}
        onClick={(e) => {
           e.preventDefault()
           onOpen()
        }}
        className="absolute inset-0 flex items-center justify-center outline-none"
        aria-label={`Watch ${anime.title}`}
      >
        <span className="flex size-14 scale-75 items-center justify-center rounded-full bg-white/10 text-white opacity-0 shadow-[0_0_40px_rgba(139,92,246,0.6)] ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:opacity-100">
          <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
        </span>
      </a>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3">
        <div className="flex translate-y-2 flex-wrap gap-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {anime.genres.map((g) => (
            <span key={g} className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-zinc-200 backdrop-blur-md">
              {g}
            </span>
          ))}
        </div>
        <h3 className="line-clamp-1 text-sm font-bold text-white">{anime.title}</h3>
        <p className="text-xs text-zinc-400">
          {anime.year} &middot; {anime.episodes} eps
        </p>
        <button
          type="button"
          onClick={handleToggleList}
          className={
            inList
              ? 'pointer-events-auto flex translate-y-2 items-center justify-center gap-1.5 rounded-lg bg-cyan-400 py-2 text-xs font-semibold text-zinc-950 opacity-0 transition-all duration-300 hover:bg-cyan-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100'
              : 'pointer-events-auto flex translate-y-2 items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-semibold text-zinc-950 opacity-0 transition-all duration-300 hover:bg-cyan-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100'
          }
        >
          {inList ? (
            <>
              <Check className="size-3.5" aria-hidden="true" />
              In List
            </>
          ) : (
            <>
              <Plus className="size-3.5" aria-hidden="true" />
              Add to List
            </>
          )}
        </button>
      </div>
    </article>
  )
}