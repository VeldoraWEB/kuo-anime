import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { Anime } from '@/entities/anime'
import { useAnilibriaRelease, type AnilibriaEpisode } from '@/entities/anime'
import VideoPlayer, { type PlaybackState } from './VideoPlayer'
import PlayerControls from './PlayerControls'
import EpisodeGrid from './EpisodeGrid'
import { useAutoHideControls } from '../model/useAutoHideControls'
import { usePortalTarget } from '../model/usePortalTarget'
import { useVideoPlayState } from '../model/useVideoPlayState'
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

  const { data, isLoading, error } = useAnilibriaRelease(anime.anilibria_alias)
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

  if (isLoading) {
    return (
      <div className="mx-auto flex aspect-video w-full max-w-6xl items-center justify-center gap-2 rounded-3xl border border-white/10 bg-zinc-950/60 text-sm text-zinc-500">
        <Loader2 className="size-5 animate-spin text-violet-400" />
        Загрузка плеера…
      </div>
    )
  }

  if (error || episodes.length === 0) {
    return (
      <div className="mx-auto flex aspect-video w-full max-w-6xl items-center justify-center rounded-3xl border border-rose-500/20 bg-rose-500/5 text-sm text-rose-300">
        Не удалось загрузить видео:{' '}
        {error instanceof Error ? error.message : 'нет серий'}
      </div>
    )
  }

  const sortedEpisodes = [...episodes].sort((a, b) => a.ordinal - b.ordinal)
  const currentEp =
    sortedEpisodes.find((e) => e.ordinal === currentEpisode) ??
    sortedEpisodes[0]

  const availableQualities: Quality[] = []
  if (currentEp.hls_480) availableQualities.push('480p')
  if (currentEp.hls_720) availableQualities.push('720p')
  if (currentEp.hls_1080) availableQualities.push('1080p')

  const effectiveQuality: Quality =
    currentQuality && availableQualities.includes(currentQuality)
      ? currentQuality
      : (availableQualities[availableQualities.length - 1] ?? '480p')

  const src =
    effectiveQuality === '1080p'
      ? currentEp.hls_1080
      : effectiveQuality === '720p'
        ? currentEp.hls_720
        : currentEp.hls_480

  const goToEpisode = (n: number) => {
    if (n < 1 || n > sortedEpisodes.length) return
    setCurrentEpisode(n)
  }

  const goPrev = () => goToEpisode(currentEpisode - 1)
  const goNext = () => goToEpisode(currentEpisode + 1)

  return (
    <section
      aria-label="Video player"
      className="relative mx-auto w-full max-w-6xl"
    >
      <div
        ref={setContainerEl}
        className="group/player relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_40px_120px_-30px_rgba(99,102,241,0.5)]"
      >
        {src && (
          <VideoPlayer
            src={src}
            poster={anime.image}
            stateRef={playbackStateRef}
            onReady={setVideoEl}
            episodeKey={currentEpisode}
          />
        )}

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