import { supabase } from '@/shared/api/supabase'
import type { Anime } from '../model/types'
import { mapRow, type AnimeRow } from './mapRow'

export async function getAnimeBySlug(slug: string): Promise<Anime | null> {
  const { data, error } = await supabase
    .from('anime_with_rating')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data ? mapRow(data as AnimeRow) : null
}