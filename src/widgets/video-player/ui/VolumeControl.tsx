import { Volume2, VolumeX } from 'lucide-react'
import PlayerButton from './PlayerButton'

type Props = {
  isMuted: boolean
  volume: number
  onToggleMute: () => void
  onChangeVolume: (percent: number) => void
}

export default function VolumeControl({ isMuted, volume, onToggleMute, onChangeVolume }: Props) {
  return (
    <div className="group/volume flex items-center">
      <PlayerButton label={isMuted ? 'Unmute' : 'Mute'} onClick={onToggleMute}>
        {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </PlayerButton>
      <div className="relative hidden h-1 w-0 items-center overflow-hidden rounded-full bg-white/20 transition-all duration-300 group-hover/volume:w-20 group-focus-within/volume:w-20 sm:flex">
        <div className="h-full rounded-full bg-white" style={{ width: `${volume * 100}%` }} />
        <input
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e) => onChangeVolume(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          aria-label="Volume"
        />
      </div>
    </div>
  )
}