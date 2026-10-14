import { useEffect, useRef } from 'react'

export function useAutoHideControls(
  container: HTMLElement | null,
  enabled: boolean,
  delay = 2500,
) {
  const pinnedRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!container) return

    const clearTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const hide = () => {
      if (pinnedRef.current) return
      container.classList.add('controls-hidden')
    }

    const show = () => {
      container.classList.remove('controls-hidden')
    }

    const scheduleHide = () => {
      clearTimer()
      if (!enabled) {
        show()
        return
      }
      if (pinnedRef.current) return
      timerRef.current = window.setTimeout(hide, delay)
    }

    const onMove = () => {
      show()
      scheduleHide()
    }

    const onLeave = () => {
      clearTimer()
      if (enabled && !pinnedRef.current) {
        timerRef.current = window.setTimeout(hide, 400)
      }
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    scheduleHide()

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      clearTimer()
      container.classList.remove('controls-hidden')
    }
  }, [container, enabled, delay])

  const setPinned = (pinned: boolean) => {
    pinnedRef.current = pinned
    if (!container) return

    if (pinned) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      container.classList.remove('controls-hidden')
    } else if (enabled) {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        if (!pinnedRef.current) {
          container.classList.add('controls-hidden')
        }
      }, delay)
    }
  }

  return { setPinned }
}