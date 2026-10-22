import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyList, getMyListIds, addToMyList, removeFromMyList } from './myList'

export function useMyList() {
  return useQuery({
    queryKey: ['my-list'],
    queryFn: getMyList,
    staleTime: 5 * 60 * 1000,
  })
}

export function useMyListIds() {
  return useQuery({
    queryKey: ['my-list-ids'],
    queryFn: getMyListIds,
    staleTime: 5 * 60 * 1000,
  })
}

export function useIsInMyList(animeId: string | undefined) {
  const { data: ids = [] } = useMyListIds()
  return animeId ? ids.includes(animeId) : false
}

type ToggleVars = { animeId: string; inList: boolean }

export function useToggleMyList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ animeId, inList }: ToggleVars) => {
      try {
        if (inList) await removeFromMyList(animeId)
        else await addToMyList(animeId)
      } catch (error) {
        console.error('Ошибка при мутации списка:', error)
        throw error 
      }
    },

    onMutate: async ({ animeId, inList }) => {
      await queryClient.cancelQueries({ queryKey: ['my-list-ids'] })
      const previous = queryClient.getQueryData<string[]>(['my-list-ids'])

      queryClient.setQueryData<string[]>(['my-list-ids'], (old) => {
        const currentList = Array.isArray(old) ? old : []
        return inList 
          ? currentList.filter((id) => id !== animeId) 
          : [...currentList, animeId]
      })

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['my-list-ids'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-list-ids'] })
      queryClient.invalidateQueries({ queryKey: ['my-list'] })
    },
  })
}