import { useQuery } from '@tanstack/react-query'
import type { Anime } from '@/entities/anime'
import { getRelatedAnime } from './getRelatedAnime'

export function useRelatedAnime(anime: Anime) {
  return useQuery({
    queryKey: ['related-anime', anime.id],
    queryFn: () => getRelatedAnime(anime),
    enabled: Boolean(anime.id),
    staleTime: 30 * 60 * 1000, 
  })
}