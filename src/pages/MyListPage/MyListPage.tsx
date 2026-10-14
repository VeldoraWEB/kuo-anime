import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import type { Anime } from '@/entities/anime'
import { useMyList, useToggleMyList, useAuthStore } from '@/entities/user'
import MyListItem from './MyListItem'

export default function MyListPage() {
  const user = useAuthStore((s) => s.user)
  const { data: list = [], isLoading, error } = useMyList()
  const toggle = useToggleMyList()

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Sign in to see your list</h1>
        <Link
          to="/login"
          className="rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Log in
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-8 animate-spin text-violet-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-300">
        Error: {error instanceof Error ? error.message : 'unknown'}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">My List</h1>
          <p className="mt-1.5 text-sm text-zinc-500">{list.length} saved titles</p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-zinc-500">
            Your list is empty. Add anime from the home page.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-violet-400 transition-colors hover:text-cyan-300"
          >
            ← Back to catalog
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((anime: Anime) => (
            <li key={anime.id}>
              <MyListItem
                anime={anime}
                onRemove={() => toggle.mutate({ animeId: anime.id, inList: true })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}