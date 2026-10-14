import { useInfiniteQuery } from '@tanstack/react-query'
import { getAnimeList, PAGE_SIZE } from './getAnimeList'

export function useAnimeList() {
  return useInfiniteQuery({
    queryKey: ['anime-list'],
    queryFn: ({ pageParam }) => getAnimeList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined
      return allPages.length * PAGE_SIZE
    },
    staleTime: 5 * 60 * 1000,
  })
}