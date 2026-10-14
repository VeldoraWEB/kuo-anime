import { supabase } from '@/shared/api/supabase'
import type { AnilibriaRelease } from '../model/anilibria'

export async function getAnilibriaRelease(alias: string): Promise<AnilibriaRelease> {
  const { data, error } = await supabase.functions.invoke('anilibria-proxy', {
    body: { alias },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)

  return data.data as AnilibriaRelease
}


//localhost-разработка
// import type { AnilibriaRelease } from '../model/anilibria'

// const ANILIBRIA_API = 'https://anilibria.top/api/v1'

// export async function getAnilibriaRelease(alias: string): Promise<AnilibriaRelease> {
//   const res = await fetch(`${ANILIBRIA_API}/anime/releases/${alias}`)
//   if (!res.ok) throw new Error(`AniLibria: ${res.status} for ${alias}`)
//   return res.json()
// }