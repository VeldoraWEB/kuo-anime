import { Sparkles } from 'lucide-react'
import { cn } from '@/shared/lib'
import { glass } from '@/shared/config/glass'
import { AnimeCatalog } from '@/widgets/anime-catalog'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="site-title"
        className={cn(glass, 'relative isolate overflow-hidden rounded-3xl px-6 py-16 sm:px-12 sm:py-20')}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 size-80 rotate-12 rounded-[3rem] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-transparent" />
          <div className="absolute -bottom-24 right-40 size-56 -rotate-12 rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-tr from-cyan-500/15 to-transparent" />
          <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-violet-500/60 via-cyan--400/40 to-transparent" />
          <div className="absolute bottom-0 right-0 h-px w-1/2 bg-gradient-to-l from-cyan-400/50 to-transparent" />
        </div>

        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Best shows of all time
        </p>
        <h1
          id="site-title"
          className="text-balance text-6xl font-black leading-[0.9] tracking-tighter sm:text-8xl lg:text-9xl"
        >
          <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">KUO</span>{' '}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            ANIME
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Every great story starts with a single step
        </p>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ['1K+', 'Episodes'],
            ['1080p', 'Full hd'],
            ['0$', 'To Watch'],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</dt>
              <dd className="font-mono text-2xl font-bold text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AnimeCatalog />
    </div>
  )
}