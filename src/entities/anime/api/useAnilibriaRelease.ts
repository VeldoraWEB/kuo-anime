import { useQuery } from '@tanstack/react-query'
import { getAnilibriaRelease } from './getAnilibriaRelease'

export function useAnilibriaRelease(alias: string | null | undefined) {
  return useQuery({
    queryKey: ['anilibria-release', alias],
    queryFn: () => getAnilibriaRelease(alias!),
    enabled: Boolean(alias),
    staleTime: 30 * 60 * 1000, 
  })
}