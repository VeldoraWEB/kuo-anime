import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dices, Loader2 } from 'lucide-react'
import { supabase } from '@/shared/api/supabase'

const COOLDOWN_MS = 3000

export default function RandomButton() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const lastClickRef = useRef(0)

  const handleClick = async () => {
    const now = Date.now()
    if (now - lastClickRef.current < COOLDOWN_MS) return
    lastClickRef.current = now

    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc('random_anime')
      if (error) throw error
      if (!data?.length) return
      navigate(`/anime/${data[0].slug}`)
    } catch (e) {
      console.error('Random failed:', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.9)] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(34,211,238,0.9)] active:scale-95 disabled:opacity-70"
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Dices className="size-4 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
      )}
      <span className="hidden lg:inline">Random</span>
      <span className="sr-only lg:hidden">Random</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  )
}