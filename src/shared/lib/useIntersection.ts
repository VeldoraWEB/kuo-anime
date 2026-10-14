import { useEffect, useRef } from 'react'

export function useIntersection(
  onIntersect: () => void,
  enabled: boolean = true,
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect()
      },
      { rootMargin: '200px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return ref
}