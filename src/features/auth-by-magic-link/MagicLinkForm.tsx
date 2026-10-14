import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { sendMagicLink } from '@/entities/user'

const ALLOWED_DOMAINS = ['gmail.com', 'mail.ru', 'yandex.ru']

export default function MagicLinkForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    setError(null)
    const trimmed = email.trim().toLowerCase()
    const domain = trimmed.split('@')[1]

    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      setError('Allowed: gmail.com, mail.ru, yandex.ru')
      return
    }

    setIsLoading(true)
    try {
      await sendMagicLink(trimmed)
      setIsSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-3">
        <CheckCircle2 className="size-12 text-emerald-400" />
        <p className="text-center text-xs text-zinc-500">
          Don't see the email? Check the Spam folder. Link is valid for 1 hour.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSent(false)
            setEmail('')
          }}
          className="mt-2 text-xs text-zinc-500 hover:text-white"
        >
          ← Change email
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-xs font-medium text-zinc-400">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            id="login-email"
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/20 disabled:opacity-60"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSend}
        disabled={isLoading}
        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg hover:from-violet-500 hover:to-cyan-500 active:scale-[0.98] disabled:opacity-60"
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Send link'}
      </button>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </>
  )
}