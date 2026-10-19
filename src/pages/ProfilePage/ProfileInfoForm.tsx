import { useState } from 'react'
import { Check, Eye, EyeOff, X } from 'lucide-react'
import { cn } from '@/shared/lib'
import { glass } from '@/shared/config/glass'

type Props = {
  displayName: string
  onDisplayNameChange: (v: string) => void
  email: string
  isSaving: boolean
  savedMessage: boolean
  onSave: () => void
  onCancel: () => void
}

const inputClass =
  'h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 hover:border-white/20 focus:border-violet-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/20'

export default function ProfileInfoForm({
  displayName,
  onDisplayNameChange,
  email,
  isSaving,
  savedMessage,
  onSave,
  onCancel,
}: Props) {
  const [showEmail, setShowEmail] = useState(false)

  return (
    <section aria-labelledby="info-title" className={cn(glass, 'rounded-3xl p-6 sm:p-8')}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 id="info-title" className="text-lg font-semibold text-white">
          Profile info
        </h2>
      </div>

      {savedMessage && (
        <p className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-300">
          Saved
        </p>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="display-name" className="text-xs font-medium text-zinc-400">
            Display Name
          </label>
          <input
            id="display-name"
            value={displayName}
            onChange={(e) => {
              const cleanValue = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
              onDisplayNameChange(cleanValue); }}
            maxLength={16}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="profile-email" className="text-xs font-medium text-zinc-400">
            Email Address
          </label>
          <div className="relative">
            <input
              id="profile-email"
              type="email"
              value={showEmail ? email : '••••••••'}
              readOnly
              className={cn(inputClass, 'cursor-not-allowed pr-10 text-zinc-400')}
            />
            <button
              type="button"
              onClick={() => setShowEmail((v) => !v)}
              aria-label={showEmail ? 'Hide email' : 'Show email'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-white"
            >
              {showEmail ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-end gap-3 border-t border-white/5 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.8)] transition-all duration-300 hover:from-violet-500 hover:to-cyan-500 active:scale-[0.98] disabled:opacity-60"
          >
            <Check className="size-4" aria-hidden="true" />
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </section>
  )
}