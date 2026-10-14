import { useEffect, useState } from 'react'

export function useVideoPlayState(videoEl: HTMLVideoElement | null) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!videoEl) return
    const sync = () => setIsPlaying(!videoEl.paused)
    videoEl.addEventListener('play', sync)
    videoEl.addEventListener('pause', sync)
    sync()
    return () => {
      videoEl.removeEventListener('play', sync)
      videoEl.removeEventListener('pause', sync)
    }
  }, [videoEl])

  return isPlaying
}