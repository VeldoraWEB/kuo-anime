export type AnilibriaEpisode = {
  id: string
  ordinal: number
  hls_480?: string | null
  hls_720?: string | null
  hls_1080?: string | null
  duration?: number
  opening?: { start: number; stop: number } | null
  ending?: { start: number; stop: number } | null
}

export type AnilibriaRelease = {
  id: number
  alias: string
  name: { main: string; english: string }
  episodes_total: number
  episodes: AnilibriaEpisode[]
}