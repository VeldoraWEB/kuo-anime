import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="font-mono text-7xl font-black text-violet-400">404</p>
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-violet-500/50 hover:bg-violet-500/10"
      >
        ← Back to home
      </Link>
    </div>
  )
}