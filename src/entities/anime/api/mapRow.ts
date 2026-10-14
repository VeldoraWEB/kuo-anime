import type { Anime } from '../model/types'

export type AnimeRow = {
  id: string
  slug: string
  title_en: string
  title_ru: string
  synopsis: string | null
  genres: string[]
  year: number | null
  episodes: number
  poster_url: string | null
  anilibria_alias: string | null
  created_at: string
  average_rating?: number | null
  rating_count?: number | null
  episodes_aired: number | null 
}

export function mapRow(row: AnimeRow): Anime {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title_en,
    titleRu: row.title_ru,
    synopsis: row.synopsis ?? '',
    genres: row.genres ?? [],
    year: row.year ?? 0,
    episodes: row.episodes ?? 0,
    image: row.poster_url ?? '',
    anilibria_alias: row.anilibria_alias,
    rating: row.average_rating ?? 0,
    ratingCount: row.rating_count ?? 0,
    episodesAired: row.episodes_aired,
  }
}