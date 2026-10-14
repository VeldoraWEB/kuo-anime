import type { Anime } from '@/entities/anime'
import { cn, getAssetUrl } from '@/shared/lib'

type Props = {
  results: Anime[]
  isLoading: boolean
  onSelect: (anime: Anime) => void
  fullWidth?: boolean
}

export default function SearchResults({ results, isLoading, onSelect, fullWidth = false }: Props) {
  if (results.length === 0 && !isLoading) {
    return (
      <p className="px-4 py-6 text-center text-xs text-zinc-500">
        Nothing found
      </p>
    )
  }

  return (
    <ul>
      {results.map((anime) => (
        <li key={anime.id}>
          <button
            type="button"
            onClick={() => onSelect(anime)}
            className={cn(
              'flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-white/5',
              fullWidth && 'py-3',
            )}
          >
            <img
              src={getAssetUrl(anime.image)}
              alt=""
              loading="lazy"
              className={cn(
                'shrink-0 rounded object-cover',
                fullWidth ? 'h-16 w-11' : 'h-14 w-10',
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-white">
                {anime.title}
              </p>
              <p className="line-clamp-1 text-xs text-zinc-500">
                {anime.titleRu}
              </p>
              <p className="mt-0.5 text-[10px] text-zinc-600">
                {anime.year} · {anime.episodes} eps
                {anime.rating != null && anime.rating > 0 && (
                  <> · ★ {anime.rating.toFixed(1)}</>
                )}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}