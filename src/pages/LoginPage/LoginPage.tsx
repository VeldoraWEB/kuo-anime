import { cn } from '@/shared/lib'
import { glass } from '@/shared/config/glass'
import { MagicLinkForm } from '@/features/auth-by-magic-link'

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100dvh-14rem)] items-center justify-center">
      <section className={cn(glass, 'relative w-full max-w-sm overflow-hidden rounded-3xl p-7 sm:p-8')}>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

        <div className="mb-7 text-center">
          <p className="text-sm font-black tracking-tight">
            <span className="text-white">KUO</span> <span className="text-zinc-500">ANIME</span>
          </p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">Log in using the link</p>
        </div>

        <MagicLinkForm />
      </section>
    </div>
  )
}