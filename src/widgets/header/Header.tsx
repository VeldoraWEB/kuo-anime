import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Bookmark } from 'lucide-react'
import { cn } from '@/shared/lib'
import { RandomButton } from '@/features/pick-random-anime'
import { SearchBar } from '@/features/search-anime'
import UserMenu from './UserMenu'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const navLink = (path: string, label: string, Icon: typeof Home) => {
    const isActive = location.pathname === path
    return (
      <button
        type="button"
        onClick={() => navigate(path)}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'text-white' : 'text-zinc-400 hover:text-white',
        )}
      >
        <Icon className="size-4 lg:hidden" aria-hidden="true" />
        <span className="hidden lg:inline">{label}</span>
        <span className="sr-only lg:hidden">{label}</span>
        <span
          className={cn(
            'absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-300',
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
          )}
        />
      </button>
    )
  }

  return (
    <header className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group shrink-0 text-lg font-black tracking-tight transition-all duration-300"
          aria-label="KUO Anime home"
        >
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-violet-400 group-hover:to-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
            KUO
          </span>
          <span className="ml-1.5 text-zinc-500 transition-all duration-300 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
            ANIME
          </span>
        </button>

        <nav aria-label="Main" className="flex flex-1 items-center justify-center gap-1 md:gap-2">
          {navLink('/', 'Home', Home)}
          {navLink('/my-list', 'My List', Bookmark)}
          <RandomButton />
          <SearchBar />
        </nav>

        <UserMenu />
      </div>
    </header>
  )
}