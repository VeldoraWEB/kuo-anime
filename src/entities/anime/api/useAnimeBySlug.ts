import { useQuery } from '@tanstack/react-query'
import { getAnimeBySlug } from './getAnimeBySlug'

export function useAnimeBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['anime', slug],
    queryFn: () => getAnimeBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000, 
  })
}