import { useEffect } from 'react'

export function useKeyboardShortcuts(videoEl: HTMLVideoElement | null) {
  useEffect(() => {
    if (!videoEl) return

    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return

      const target = e.target as HTMLInputElement
      const isTextField =
        (target.tagName === 'INPUT' && target.type !== 'range') ||
        target.tagName === 'TEXTAREA'
      if (isTextField) return

      if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
        e.preventDefault()
        if (document.fullscreenElement) document.exitFullscreen()
        else videoEl.parentElement?.requestFullscreen?.()
        return
      }

      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        videoEl.paused ? videoEl.play() : videoEl.pause()
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        videoEl.currentTime = Math.max(0, videoEl.currentTime - 5)
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        videoEl.currentTime = Math.min(videoEl.duration || 0, videoEl.currentTime + 5)
        return
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [videoEl])
}