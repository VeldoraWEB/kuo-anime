import { List, ChevronDown, SkipBack, SkipForward, Play, Pause, RotateCcw, RotateCw, Maximize, Minimize } from 'lucide-react'
import PlayerButton from './PlayerButton'
import Timeline from './Timeline'
import VolumeControl from './VolumeControl'
import QualityMenu from './QualityMenu'
import { useVideoState } from '../model/useVideoState'
import { useVideoProgress } from '../model/useVideoProgress'
import { useKeyboardShortcuts } from '../model/useKeyboardShortcuts'

type Props = {
  videoEl: HTMLVideoElement | null
  currentEpisode: number
  onPrevEpisode: () => void
  onNextEpisode: () => void
  onToggleEpisodeGrid: () => void
  qualities: string[]
  currentQuality: string
  onQualityChange: (q: string) => void
  onControlsHover: (hovering: boolean) => void
}

export default function PlayerControls({
  videoEl,
  currentEpisode,
  onPrevEpisode,
  onNextEpisode,
  onToggleEpisodeGrid,
  qualities,
  currentQuality,
  onQualityChange,
  onControlsHover,
}: Props) {
  const {
    isPlaying,
    isMuted,
    volume,
    isFullscreen,
    togglePlay,
    toggleMute,
    changeVolume,
    toggleFullscreen,
    skipSeconds,
  } = useVideoState(videoEl)

  const {
    progressFillRef,
    progressKnobRef,
    timeRef,
    durationTextRef,
    tooltipRef,
    tooltipTimeRef,
    handleTimelineMove,
    handleTimelineClick,
  } = useVideoProgress(videoEl)

  useKeyboardShortcuts(videoEl)

  return (
    <>
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className="player-controls absolute left-1/2 top-1/2 z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_60px_rgba(139,92,246,0.7)] active:scale-95 sm:size-20"
        >
          <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden="true" />
        </button>
      )}

      <button
        type="button"
        onClick={onToggleEpisodeGrid}
        className="player-controls absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/80"
      >
        <List className="size-3.5" />
        Серия {currentEpisode}
        <ChevronDown className="size-3.5" />
      </button>

      <div
        className="player-controls absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 bg-gradient-to-t from-black/90 to-transparent p-3 pt-10 sm:p-5"
        onMouseEnter={() => onControlsHover(true)}
        onMouseLeave={() => onControlsHover(false)}
      >
        <Timeline
          progressFillRef={progressFillRef}
          progressKnobRef={progressKnobRef}
          tooltipRef={tooltipRef}
          tooltipTimeRef={tooltipTimeRef}
          onMove={handleTimelineMove}
          onClick={handleTimelineClick}
        />

        <div className="flex items-center gap-1 sm:gap-2">
          <PlayerButton label="Previous episode" onClick={onPrevEpisode}>
            <SkipBack className="size-4 fill-current" aria-hidden="true" />
          </PlayerButton>

          <PlayerButton label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
            {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
          </PlayerButton>

          <PlayerButton label="Next episode" onClick={onNextEpisode}>
            <SkipForward className="size-4 fill-current" aria-hidden="true" />
          </PlayerButton>

          <VolumeControl
            isMuted={isMuted}
            volume={volume}
            onToggleMute={toggleMute}
            onChangeVolume={changeVolume}
          />

          <span className="ml-2 font-mono text-xs tabular-nums text-zinc-300">
            <span ref={timeRef}>0:00</span>{' '}
            <span className="text-zinc-600">
              / <span ref={durationTextRef}>0:00</span>
            </span>
          </span>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <PlayerButton label="Rewind 10 seconds" onClick={() => skipSeconds(-10)}>
              <RotateCcw className="size-4" aria-hidden="true" />
            </PlayerButton>

            <PlayerButton label="Forward 10 seconds" onClick={() => skipSeconds(10)}>
              <RotateCw className="size-4" aria-hidden="true" />
            </PlayerButton>

            <QualityMenu
              qualities={qualities}
              currentQuality={currentQuality}
              onQualityChange={onQualityChange}
            />

            <PlayerButton
              label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
            </PlayerButton>
          </div>
        </div>
      </div>
    </>
  )
}