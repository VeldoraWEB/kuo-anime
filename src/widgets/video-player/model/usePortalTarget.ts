import { useEffect, useState } from 'react'

export function usePortalTarget() {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const update = () => {
      setTarget((document.fullscreenElement as HTMLElement) || null)
    }
    update()
    document.addEventListener('fullscreenchange', update)
    return () => document.removeEventListener('fullscreenchange', update)
  }, [])

  return target
}