import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useIntersection } from '@/shared/lib/useIntersection'
import { AnimeCard, useAnimeList, type Anime } from '@/entities/anime'

export default function AnimeCatalog() {
  const navigate = useNavigate()
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAnimeList()

  const animeList: Anime[] = data?.pages.flat() ?? []

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const sentinelRef = useIntersection(handleIntersect, hasNextPage)

  const openAnime = (anime: Anime) => {
    navigate(`/anime/${anime.slug}`)
  }

  return (
    <section aria-labelledby="catalog-title" className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="catalog-title" className="text-2xl font-bold tracking-tight text-white">
            Catalog
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Trending and newly added series</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-violet-400" />
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">
          Failed to load catalog: {error instanceof Error ? error.message : 'unknown'}
        </p>
      )}

      {!isLoading && !error && (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {animeList.map((anime) => (
              <li key={anime.id}>
                <AnimeCard anime={anime} onOpen={() => openAnime(anime)} />
              </li>
            ))}
          </ul>

          {hasNextPage && (
            <div ref={sentinelRef} className="flex items-center justify-center py-8">
              {isFetchingNextPage && (
                <Loader2 className="size-6 animate-spin text-violet-400" />
              )}
            </div>
          )}

          {!hasNextPage && animeList.length > 0 && (
            <p className="py-6 text-center text-xs text-zinc-600">
              All titles loaded
            </p>
          )}
        </>
      )}
    </section>
  )
}