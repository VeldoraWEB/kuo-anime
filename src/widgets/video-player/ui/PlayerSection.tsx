import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Play } from 'lucide-react'
import type { Anime } from '@/entities/anime'
import {
  useAnilibriaRelease,
  type AnilibriaEpisode,
} from '@/entities/anime'
import VideoPlayer, { type PlaybackState } from './VideoPlayer'
import PlayerControls from './PlayerControls'
import EpisodeGrid from './EpisodeGrid'
import { useAutoHideControls } from '../model/useAutoHideControls'
import { usePortalTarget } from '../model/usePortalTarget'
import { useVideoPlayState } from '../model/useVideoPlayState'
import { getAssetUrl } from '@/shared/lib'
import '../player.css'

type Quality = '480p' | '720p' | '1080p'

type Props = {
  anime: Anime
}

export default function PlayerSection({ anime }: Props) {
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [currentQuality, setCurrentQuality] = useState<Quality | null>(null)
  const [isGridOpen, setIsGridOpen] = useState(false)
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)

  const queryClient = useQueryClient()
  const [isActivated, setIsActivated] = useState(() => {
    if (!anime.anilibria_alias) return false
    const cached = queryClient.getQueryData([
      'anilibria-release',
      anime.anilibria_alias,
    ])
    return Boolean(cached)
  })

  const playbackStateRef = useRef<PlaybackState>({
    time: 0,
    wasPlaying: false,
  })

  const portalTarget = usePortalTarget()
  const isPlaying = useVideoPlayState(videoEl)

  const { setPinned } = useAutoHideControls(
    containerEl,
    isPlaying && !isGridOpen,
  )

  const { data, isLoading, error } = useAnilibriaRelease(
    isActivated ? anime.anilibria_alias : null,
  )
  const episodes: AnilibriaEpisode[] = data?.episodes ?? []

  useEffect(() => {
    if (episodes.length > 0) {
      const sorted = [...episodes].sort((a, b) => a.ordinal - b.ordinal)
      setCurrentEpisode(sorted[0].ordinal)
    }
  }, [episodes])

  if (!anime.anilibria_alias) {
    return (
      <div className="mx-auto flex aspect-video w-full max-w-6xl items-center justify-center rounded-3xl border border-white/10 bg-zinc-950/60 text-sm text-zinc-500">
        Плеер для этого аниме пока недоступен
      </div>
    )
  }

  const sortedEpisodes = [...episodes].sort((a, b) => a.ordinal - b.ordinal)
  const currentEp =
    sortedEpisodes.find((e) => e.ordinal === currentEpisode) ?? sortedEpisodes[0]

  const availableQualities: Quality[] = []
  if (currentEp?.hls_480) availableQualities.push('480p')
  if (currentEp?.hls_720) availableQualities.push('720p')
  if (currentEp?.hls_1080) availableQualities.push('1080p')

  const effectiveQuality: Quality =
    currentQuality && availableQualities.includes(currentQuality)
      ? currentQuality
      : (availableQualities[availableQualities.length - 1] ?? '480p')

  const src =
    effectiveQuality === '1080p'
      ? currentEp?.hls_1080
      : effectiveQuality === '720p'
        ? currentEp?.hls_720
        : currentEp?.hls_480

  const goToEpisode = (n: number) => {
    if (n < 1 || n > sortedEpisodes.length) return
    setCurrentEpisode(n)
  }

  const goPrev = () => goToEpisode(currentEpisode - 1)
  const goNext = () => goToEpisode(currentEpisode + 1)

  const showPlayer = isActivated && !isLoading && !error && src
  const showLoading = isActivated && isLoading
  const showError = isActivated && !isLoading && (error || episodes.length === 0)

  return (
    <section
      aria-label="Video player"
      className="relative mx-auto w-full max-w-6xl"
    >
      <div
        ref={setContainerEl}
        className="group/player relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_40px_120px_-30px_rgba(99,102,241,0.5)]"
      >
        {showPlayer && (
          <>
            <VideoPlayer
              src={src}
              poster={anime.image}
              stateRef={playbackStateRef}
              onReady={setVideoEl}
              episodeKey={currentEpisode}
            />
            <PlayerControls
              videoEl={videoEl}
              currentEpisode={currentEpisode}
              onPrevEpisode={goPrev}
              onNextEpisode={goNext}
              onToggleEpisodeGrid={() => setIsGridOpen((v) => !v)}
              qualities={availableQualities}
              currentQuality={effectiveQuality}
              onQualityChange={(q) => setCurrentQuality(q as Quality)}
              onControlsHover={setPinned}
            />
          </>
        )}

        {!isActivated && (
          <button
            type="button"
            onClick={() => setIsActivated(true)}
            aria-label="Включить плеер"
            className="group/activation absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <img
              src={getAssetUrl(anime.image)}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover/activation:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex size-20 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-xl transition-all duration-300 group-hover/activation:scale-110 group-hover/activation:bg-white/25 group-hover/activation:shadow-[0_0_60px_rgba(139,92,246,0.7)]">
                <Play className="ml-1 size-8 fill-current" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-white/90">
                Смотреть
              </span>
            </div>
          </button>
        )}

        {showLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <Loader2 className="size-5 animate-spin text-violet-400" />
            Загрузка плеера…
          </div>
        )}

        {showError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-sm text-rose-300">
            <span>
              Не удалось загрузить видео:{' '}
              {error instanceof Error ? error.message : 'нет серий'}
            </span>
            <button
              type="button"
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ['anilibria-release', anime.anilibria_alias],
                })
              }}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-white hover:bg-white/20"
            >
              Повторить
            </button>
          </div>
        )}
      </div>

      {isGridOpen && (
        <EpisodeGrid
          currentEpisode={currentEpisode}
          totalEpisodes={sortedEpisodes.length}
          onSelect={goToEpisode}
          onClose={() => setIsGridOpen(false)}
          portalTarget={portalTarget}
        />
      )}
    </section>
  )
}