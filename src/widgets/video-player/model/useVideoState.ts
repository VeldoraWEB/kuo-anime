import { useEffect, useState } from 'react'

export function useVideoState(videoEl: HTMLVideoElement | null) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!videoEl) return
    const video = videoEl

    const syncPlaying = () => setIsPlaying(!video.paused)
    const onVolume = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))

    video.addEventListener('loadedmetadata', syncPlaying)
    video.addEventListener('emptied', syncPlaying)
    video.addEventListener('play', syncPlaying)
    video.addEventListener('pause', syncPlaying)
    video.addEventListener('playing', syncPlaying)
    video.addEventListener('volumechange', onVolume)
    document.addEventListener('fullscreenchange', onFullscreen)

    syncPlaying()
    setVolume(video.volume)
    setIsMuted(video.muted)

    return () => {
      video.removeEventListener('loadedmetadata', syncPlaying)
      video.removeEventListener('emptied', syncPlaying)
      video.removeEventListener('play', syncPlaying)
      video.removeEventListener('pause', syncPlaying)
      video.removeEventListener('playing', syncPlaying)
      video.removeEventListener('volumechange', onVolume)
      document.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [videoEl])

  const togglePlay = () => {
    if (!videoEl) return
    videoEl.paused ? videoEl.play() : videoEl.pause()
  }

  const toggleMute = () => {
    if (!videoEl) return
    videoEl.muted = !videoEl.muted
  }

  const changeVolume = (percent: number) => {
    if (!videoEl) return
    videoEl.volume = percent / 100
    if (videoEl.volume > 0) videoEl.muted = false
  }

  const toggleFullscreen = () => {
    if (!videoEl) return
    if (document.fullscreenElement) document.exitFullscreen()
    else videoEl.parentElement?.requestFullscreen?.()
  }

  const skipSeconds = (delta: number) => {
    if (!videoEl) return
    const dur = videoEl.duration || 0
    videoEl.currentTime = Math.max(0, Math.min(dur, videoEl.currentTime + delta))
  }

  return {
    isPlaying,
    isMuted,
    volume,
    isFullscreen,
    togglePlay,
    toggleMute,
    changeVolume,
    toggleFullscreen,
    skipSeconds,
  }
}