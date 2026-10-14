import { Link } from 'react-router-dom'
import { Play, X } from 'lucide-react'
import { cn, getAssetUrl } from '@/shared/lib'
import { glass } from '@/shared/config/glass'
import type { Anime } from '@/entities/anime'
import { RateAnime } from '@/features/rate-anime'

type Props = {
  anime: Anime
  onRemove: () => void
}

export default function MyListItem({ anime, onRemove }: Props) {
  return (
    <article
      className={cn(
        glass,
        'group relative flex gap-4 rounded-2xl p-3 transition-all duration-300 hover:border-violet-500/30 hover:bg-zinc-950/60',
      )}
    >
      <Link
        to={`/anime/${anime.slug}`}
        aria-label={`Open ${anime.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl">
        <img
          src={getAssetUrl(anime.image)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="size-6 fill-white text-white" aria-hidden="true" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 font-semibold text-white">{anime.title}</h2>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onRemove()
            }}
            aria-label={`Remove ${anime.title} from list`}
            className="relative z-20 -mr-1 -mt-1 rounded-md p-1 text-zinc-600 opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-400 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-0.5 text-xs text-zinc-500">{anime.genres.join(' · ')}</p>

        <div className="pointer-events-none relative z-20 mt-auto flex items-center justify-between pt-3">
          <div className="pointer-events-auto">
            <RateAnime animeId={anime.id} title={anime.title} />
            <span className="text-[10px] text-zinc-500">
              Rating:{' '}
              <span className="font-mono text-zinc-400">
                {anime.rating?.toFixed(1) ?? '0.0'}
              </span>
              <span className="text-zinc-600"> ({anime.ratingCount ?? 0})</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}