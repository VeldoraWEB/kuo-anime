import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyRatings, setRating } from './ratings'

export function useMyRatings() {
  return useQuery({
    queryKey: ['my-ratings'],
    queryFn: getMyRatings,
    staleTime: 5 * 60 * 1000,
  })
}

export function useMyRating(animeId: string | undefined) {
  const { data: ratings = {} } = useMyRatings()
  return animeId ? ratings[animeId] : undefined
}

type RateVars = { animeId: string; value: number }

export function useSetRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ animeId, value }: RateVars) => setRating(animeId, value),

    onMutate: async ({ animeId, value }) => {
      await queryClient.cancelQueries({ queryKey: ['my-ratings'] })
      const previous = queryClient.getQueryData<Record<string, number>>(['my-ratings'])

      queryClient.setQueryData<Record<string, number>>(['my-ratings'], (old = {}) => ({
        ...old,
        [animeId]: value,
      }))

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['my-ratings'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-ratings'] })
      queryClient.invalidateQueries({ queryKey: ['my-list'] })
      queryClient.invalidateQueries({ queryKey: ['anime'] })
    },
  })
}