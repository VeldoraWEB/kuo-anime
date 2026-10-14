import { supabase } from '@/shared/api/supabase'

export async function getMyRatings(): Promise<Record<string, number>> {
  const { data, error } = await supabase.rpc('get_my_ratings')
  if (error) throw error

  const map: Record<string, number> = {}
  for (const row of data ?? []) {
    map[row.anime_id] = row.value
  }
  return map
}

export async function setRating(animeId: string, value: number): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('ratings')
    .upsert(
      { user_id: user.id, anime_id: animeId, value, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,anime_id' },
    )

  if (error) throw error
}
