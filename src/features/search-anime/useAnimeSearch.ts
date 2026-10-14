import { useEffect, useState } from 'react'
import { searchAnime, type Anime } from '@/entities/anime'

export function useAnimeSearch(query: string) {
  const [results, setResults] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timeout = setTimeout(() => {
      searchAnime(query)
        .then((res) => setResults(res.slice(0, 7)))
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }, 300)

    return () => {
      clearTimeout(timeout)
      setIsLoading(false)
    }
  }, [query])

  return { results, isLoading }
}