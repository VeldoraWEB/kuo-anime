import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Anime } from '@/entities/anime'
import { getAssetUrl } from '@/shared/lib'

export default function RelatedAnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link
      to={`/anime/${anime.slug}`}
      className="group relative flex aspect-[2/3] flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900 transition-all duration-300 hover:scale-[1.03] hover:border-violet-500/40 hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.5)]"
    >
      <img
        src={getAssetUrl(anime.image)}
        alt={anime.title}
        loading="lazy"
        width={600}
        height={900}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {anime.rating != null && anime.rating > 0 && (
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-md">
          <Star className="size-2.5 fill-current" aria-hidden="true" />
          {anime.rating.toFixed(1)}
        </div>
      )}

      <div className="relative mt-auto p-2.5">
        <h3 className="line-clamp-2 text-xs font-bold leading-tight text-white">
          {anime.title}
        </h3>
        <p className="mt-1 text-[10px] text-zinc-400">
          {anime.year} · {anime.episodes} eps
        </p>
      </div>
    </Link>
  )
}