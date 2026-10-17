import { supabase } from '@/shared/api/supabase'
import { mapRow, type AnimeRow, type Anime } from '@/entities/anime'

export async function getRelatedAnime(
  anime: Anime,
  limit = 6,
): Promise<Anime[]> {
  const { data, error } = await supabase.rpc('related_anime', {
    p_anime_id: anime.id,
    p_title: anime.title, 
    p_genres: anime.genres,
    p_year: anime.year,
    p_limit: limit,
  })

  if (error) throw error
  return ((data ?? []) as AnimeRow[]).map(mapRow)
}