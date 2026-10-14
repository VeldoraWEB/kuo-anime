import { supabase } from '@/shared/api/supabase'
import { mapRow, type AnimeRow, type Anime } from '@/entities/anime'

export async function getMyList(): Promise<Anime[]> {

  const { data: listData, error: listError } = await supabase
    .from('my_list')
    .select('anime_id, added_at')
    .order('added_at', { ascending: false })

  if (listError) throw listError
  if (!listData?.length) return []

  const ids = listData.map((r) => r.anime_id as string)

  const { data: animeData, error: animeError } = await supabase
    .from('anime_with_rating')
    .select('*')
    .in('id', ids)

  if (animeError) throw animeError

  const map = new Map((animeData ?? []).map((a) => [a.id as string, a]))
  return listData
    .map((row) => map.get(row.anime_id as string))
    .filter((a): a is AnimeRow => Boolean(a))
    .map(mapRow)
}

export async function getMyListIds(): Promise<string[]> {
  const { data, error } = await supabase.from('my_list').select('anime_id')
  if (error) throw error
  return (data ?? []).map((r) => r.anime_id as string)
}

export async function addToMyList(animeId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('my_list')
    .insert({ user_id: user.id, anime_id: animeId })

  if (error) throw error
}

export async function removeFromMyList(animeId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('my_list')
    .delete()
    .eq('user_id', user.id)
    .eq('anime_id', animeId)

  if (error) throw error
}