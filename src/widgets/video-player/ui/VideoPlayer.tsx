import { useEffect, useRef, type RefObject } from 'react'
import Hls from 'hls.js'
import { getAssetUrl } from '@/shared/lib';

export type PlaybackState = { time: number; wasPlaying: boolean }

type Props = {
  src: string
  poster?: string
  stateRef: RefObject<PlaybackState>
  onReady?: (video: HTMLVideoElement) => void
  episodeKey: number
}

const PROXY_URL = 'https://anilibria-proxy.kuoanimesite.workers.dev/?url=';

export default function VideoPlayer({
  src,
  poster,
  stateRef,
  onReady,
  episodeKey,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevEpisodeRef = useRef(episodeKey)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    let isCancelled = false

    const proxiedSrc = src.startsWith('http') 
      ? `${PROXY_URL}${encodeURIComponent(src)}` 
      : src;

    const episodeChanged = prevEpisodeRef.current !== episodeKey
    const saved = stateRef.current
    const restoreTime = episodeChanged ? 0 : saved.time
    const restorePlay = saved.wasPlaying
    prevEpisodeRef.current = episodeKey

    let hls: Hls | null = null

    const syncTime = () => { stateRef.current.time = video.currentTime }
    const syncPlay = () => { stateRef.current.wasPlaying = !video.paused }
    const handleClick = () => {
      video.paused ? video.play().catch(() => {}) : video.pause()
    }
    const handleContext = (e: MouseEvent) => e.preventDefault()

    video.addEventListener('timeupdate', syncTime)
    video.addEventListener('play', syncPlay)
    video.addEventListener('pause', syncPlay)
    video.addEventListener('click', handleClick)
    video.addEventListener('contextmenu', handleContext)

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false,
        lowLatencyMode: false,
        manifestLoadingTimeOut: 30000,
        fragLoadingTimeOut: 30000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        xhrSetup: (xhr) => { xhr.withCredentials = false; }
      })
      
      hls.loadSource(proxiedSrc) 
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isCancelled) return
        if (restoreTime > 0) video.currentTime = restoreTime
        if (restorePlay) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch((e) => {
              if (e.name !== 'AbortError') console.error('Play error:', e)
            })
          }
        }
        onReady?.(video)
      })

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.details === 'bufferSeekOverHole') return
        console.error('[VideoPlayer] HLS ERROR:', data.type, data.details)
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl') === 'probably') {
      video.src = proxiedSrc 
      onReady?.(video)
    }

    return () => {
      isCancelled = true
      stateRef.current = { time: video.currentTime, wasPlaying: !video.paused }
      video.removeEventListener('timeupdate', syncTime)
      video.removeEventListener('play', syncPlay)
      video.removeEventListener('pause', syncPlay)
      video.removeEventListener('click', handleClick)
      video.removeEventListener('contextmenu', handleContext)
      hls?.destroy()
    }
  }, [src, episodeKey, onReady, stateRef])

  return (
    <video
      ref={videoRef}
      poster={getAssetUrl(poster)}
      controls={false}
      playsInline
      crossOrigin="anonymous" 
      className="absolute inset-0 size-full bg-black object-cover"
    />
  )
}



//для dev без vpn

// import { useEffect, useRef, type RefObject } from 'react'
// import Hls from 'hls.js'
// import { getAssetUrl } from '@/shared/lib';

// export type PlaybackState = { time: number; wasPlaying: boolean }

// type Props = {
//   src: string
//   poster?: string
//   stateRef: RefObject<PlaybackState>
//   onReady?: (video: HTMLVideoElement) => void
//   episodeKey: number
// }

// export default function VideoPlayer({
//   src,
//   poster,
//   stateRef,
//   onReady,
//   episodeKey,
// }: Props) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const prevEpisodeRef = useRef(episodeKey)

//   useEffect(() => {
//     const video = videoRef.current
//     if (!video || !src) return

//     const episodeChanged = prevEpisodeRef.current !== episodeKey
//     const saved = stateRef.current
//     const restoreTime = episodeChanged ? 0 : saved.time
//     const restorePlay = saved.wasPlaying
//     prevEpisodeRef.current = episodeKey

//     let hls: Hls | null = null

//     const syncTime = () => {
//       stateRef.current.time = video.currentTime
//     }
//     const syncPlay = () => {
//       stateRef.current.wasPlaying = !video.paused
//     }
//     const handleClick = () => {
//       video.paused ? video.play().catch(() => {}) : video.pause()
//     }
//     const handleContext = (e: MouseEvent) => e.preventDefault()

//     video.addEventListener('timeupdate', syncTime)
//     video.addEventListener('play', syncPlay)
//     video.addEventListener('pause', syncPlay)
//     video.addEventListener('click', handleClick)
//     video.addEventListener('contextmenu', handleContext)

//     if (Hls.isSupported()) {
//       hls = new Hls({ enableWorker: true, lowLatencyMode: false })
//       hls.loadSource(src)
//       hls.attachMedia(video)

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         if (restoreTime > 0) video.currentTime = restoreTime
//         if (restorePlay) video.play().catch(() => {})
//         onReady?.(video)
//       })

//       hls.on(Hls.Events.ERROR, (_, data) => {
//         if (data.details === 'bufferSeekOverHole') return
//         console.error('[VideoPlayer] HLS ERROR:', data.type, data.details)
//       })
//     } else if (video.canPlayType('application/vnd.apple.mpegurl') === 'probably') {
//       video.src = src
//       onReady?.(video)
//     }

//     return () => {
//       stateRef.current = { time: video.currentTime, wasPlaying: !video.paused }
//       video.removeEventListener('timeupdate', syncTime)
//       video.removeEventListener('play', syncPlay)
//       video.removeEventListener('pause', syncPlay)
//       video.removeEventListener('click', handleClick)
//       video.removeEventListener('contextmenu', handleContext)
//       hls?.destroy()
//     }
//   }, [src, episodeKey, onReady, stateRef])

//   return (
//     <video
//       ref={videoRef}
//       poster={getAssetUrl(poster)}
//       controls={false}
//       playsInline
//       className="absolute inset-0 size-full bg-black object-cover"
//     />
//   )
// }