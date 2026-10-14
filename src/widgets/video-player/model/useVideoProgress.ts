import { useEffect, useRef } from 'react'
import { formatTime } from '../lib/formatTime'

export function useVideoProgress(videoEl: HTMLVideoElement | null) {
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressKnobRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const durationTextRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipTimeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!videoEl) return
    const video = videoEl

    const updateProgress = () => {
      const dur = video.duration || 0
      const cur = video.currentTime || 0
      const pct = dur ? (cur / dur) * 100 : 0

      if (progressFillRef.current) progressFillRef.current.style.width = `${pct}%`
      if (progressKnobRef.current) progressKnobRef.current.style.left = `${pct}%`
      if (timeRef.current) timeRef.current.textContent = formatTime(cur)
    }

    const onMeta = () => {
      if (durationTextRef.current) durationTextRef.current.textContent = formatTime(video.duration)
      updateProgress()
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadedmetadata', onMeta)

    if (video.duration) onMeta()

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [videoEl])

  const seekToPercent = (percent: number) => {
    if (!videoEl || !videoEl.duration) return
    videoEl.currentTime = Math.max(0, Math.min(1, percent)) * videoEl.duration
  }

  const handleTimelineMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoEl || !tooltipRef.current || !tooltipTimeRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const time = (videoEl.duration || 0) * percent
    tooltipRef.current.style.left = `${percent * 100}%`
    tooltipTimeRef.current.textContent = formatTime(time)
  }

  const handleTimelineClick = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!videoEl || !videoEl.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seekToPercent(percent)
  }

  return {
    progressFillRef,
    progressKnobRef,
    timeRef,
    durationTextRef,
    tooltipRef,
    tooltipTimeRef,
    handleTimelineMove,
    handleTimelineClick,
  }
}