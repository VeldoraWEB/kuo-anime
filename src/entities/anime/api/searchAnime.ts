import { supabase } from '@/shared/api/supabase'
import type { Anime } from '../model/types'
import { mapRow, type AnimeRow } from './mapRow'

export async function searchAnime(query: string): Promise<Anime[]> {
  const q = query.trim()
  if (!q) return []

  const { data, error } = await supabase.rpc('search_anime', { query: q })
  if (error) throw error

  return ((data ?? []) as AnimeRow[]).map(mapRow)
}