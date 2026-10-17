import type { Anime } from '@/entities/anime'
import { useRelatedAnime } from '../api/useRelatedAnime'
import RelatedAnimeCard from './RelatedAnimeCard'

type Props = {
  anime: Anime
}

export default function RelatedAnimeSection({ anime }: Props) {
  const { data: related, isLoading } = useRelatedAnime(anime)

  if (isLoading) {
    return (
      <section className="mt-8">
        <div className="mb-4 h-7 w-64 animate-pulse rounded bg-white/5" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
      </section>
    )
  }

  if (!related || related.length === 0) return null

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-bold text-white">
        Другие сезоны и может понравиться
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {related.map((a) => (
          <RelatedAnimeCard key={a.id} anime={a} />
        ))}
      </div>
    </section>
  )
}