export type Anime = {
  id: string
  slug: string
  title: string
  titleRu: string
  genres: string[]
  rating?: number
  ratingCount?: number
  year: number
  episodes: number
  image: string
  synopsis: string
  anilibria_alias?: string | null
  episodesAired?: number | null
}