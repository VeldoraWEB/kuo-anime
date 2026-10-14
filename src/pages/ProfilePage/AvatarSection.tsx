import { Check } from 'lucide-react'
import { cn, getAssetUrl } from '@/shared/lib'
import { glass } from '@/shared/config/glass'
import { AVATARS } from '@/entities/user'

type Props = {
  selectedAvatar: number
  onSelect: (id: number) => void
}

export default function AvatarSection({ selectedAvatar, onSelect }: Props) {
  const selected = AVATARS.find((a) => a.id === selectedAvatar) ?? AVATARS[0]

  return (
    <section aria-labelledby="avatar-title" className={cn(glass, 'rounded-3xl p-6 sm:p-8')}>
      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-60 blur-md"
          />
          <img
            src={getAssetUrl(selected.src)}
            alt="Selected avatar"
            className="relative size-20 rounded-full border-2 border-white/20 object-cover"
          />
        </div>
        <div>
          <h2 id="avatar-title" className="text-lg font-semibold text-white">
            Avatar
          </h2>
          <p className="text-sm text-zinc-500">Pick your lovely anime character pfp</p>
        </div>
      </div>

      <div role="radiogroup" aria-label="Avatar gallery" className="grid grid-cols-4 gap-3">
        {AVATARS.map((avatar) => {
          const isSelected = avatar.id === selectedAvatar
          return (
            <button
              key={avatar.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(avatar.id)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300',
                isSelected
                  ? 'scale-105 border-cyan-400 shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]'
                  : 'border-transparent opacity-70 hover:scale-105 hover:border-white/20 hover:opacity-100',
              )}
            >
              <img src={getAssetUrl(avatar.src)} alt="" className="size-full object-cover object-top" />
              {isSelected && (
                <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-cyan-400 text-zinc-950">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}