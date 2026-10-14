import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { cn, getAssetUrl } from '@/shared/lib'
import { glass } from '@/shared/config/glass'
import { useAuthStore, signOut } from '@/entities/user'
import MenuItem from './MenuItem'

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  const handleLogout = async () => {
    await signOut()
  }

  if (!isLoggedIn) {
    return (
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.9)] active:scale-95"
      >
        Login
      </button>
    )
  }

  return (
    <div className="relative flex shrink-0 items-center">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        className="group flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-white/5"
      >
        <span className="relative block size-9 overflow-hidden rounded-full ring-2 ring-violet-500/40 transition-all duration-300 group-hover:ring-cyan-400/70">
          <img
            src={getAssetUrl(`/anime/avatars/avatar-${user?.avatarId ?? 1}.webp`)}
            alt="Your avatar"
            className="size-full object-cover"
          />
        </span>
        <ChevronDown
          className={cn(
            'size-4 text-zinc-400 transition-transform duration-300',
            menuOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />
          <div
            role="menu"
            className={cn(
              glass,
              'absolute right-0 top-full z-50 mt-3 w-60 origin-top-right animate-in fade-in zoom-in-95 slide-in-from-top-2 rounded-xl bg-zinc-950/80 p-1.5 duration-200',
            )}
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-3 py-3">
              <img
                src={getAssetUrl(`/anime/avatars/avatar-${user?.avatarId ?? 1}.webp`)}
                alt=""
                className="size-9 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name ?? 'User'}
                </p>
              </div>
            </div>
            <div className="py-1">
              <MenuItem
                icon={User}
                label="Profile"
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/profile')
                }}
              />
            </div>
            <div className="border-t border-white/5 pt-1">
              <MenuItem
                icon={LogOut}
                label="Log out"
                danger
                onClick={() => {
                  setMenuOpen(false)
                  handleLogout()
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}