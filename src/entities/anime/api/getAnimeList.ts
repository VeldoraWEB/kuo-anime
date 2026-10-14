import { supabase } from '@/shared/api/supabase'
import type { Anime } from '../model/types'
import { mapRow, type AnimeRow } from './mapRow'

export const PAGE_SIZE = 30

export async function getAnimeList(offset: number = 0): Promise<Anime[]> {
  const { data, error } = await supabase
    .from('anime_with_rating')
    .select('*')
    .order('created_at', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  if (error) throw error
  return ((data ?? []) as AnimeRow[]).map(mapRow)
}