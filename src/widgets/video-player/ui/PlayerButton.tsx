import type { ReactNode } from 'react'

type Props = {
  label: string
  onClick: () => void
  children: ReactNode
}

export default function PlayerButton({ label, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group/btn flex size-9 items-center justify-center rounded-lg text-zinc-200 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
    >
      {children}
    </button>
  )
}