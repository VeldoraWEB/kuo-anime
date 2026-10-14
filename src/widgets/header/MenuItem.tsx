import { User } from 'lucide-react'
import { cn } from '@/shared/lib'

type Props = {
  icon: typeof User
  label: string
  onClick: () => void
  danger?: boolean
}

export default function MenuItem({ icon: Icon, label, onClick, danger }: Props) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        danger
          ? 'text-rose-400 hover:bg-rose-500/10'
          : 'text-zinc-300 hover:bg-white/5 hover:text-white',
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </button>
  )
}