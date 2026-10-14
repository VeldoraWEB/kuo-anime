import { useNavigate } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useAuthStore, useIsInMyList, useToggleMyList } from '@/entities/user'

type Variant = 'card' | 'page'

type Props = {
  animeId: string
  variant?: Variant
}

export default function ToggleMyListButton({ animeId, variant = 'card' }: Props) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const inList = useIsInMyList(animeId)
  const toggle = useToggleMyList()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      navigate('/login')
      return
    }
    toggle.mutate({ animeId, inList })
  }

  const isCard = variant === 'card'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        isCard
          ? 'pointer-events-auto flex translate-y-2 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-zinc-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100'
          : 'ml-auto flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]',
        inList
          ? isCard
            ? 'bg-cyan-400 hover:bg-cyan-300'
            : 'bg-cyan-400 text-zinc-950 shadow-[0_0_24px_-8px_rgba(34,211,238,0.9)] hover:bg-cyan-300'
          : isCard
            ? 'bg-white hover:bg-cyan-300'
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.8)] hover:from-violet-500 hover:to-cyan-500',
      )}
    >
      {inList ? (
        <>
          <Check className={isCard ? 'size-3.5' : 'size-4'} aria-hidden="true" />
          In List
        </>
      ) : (
        <>
          <Plus className={isCard ? 'size-3.5' : 'size-4'} aria-hidden="true" />
          Add to List
        </>
      )}
    </button>
  )
}