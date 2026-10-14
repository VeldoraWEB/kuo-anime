import { create } from 'zustand'

export type AuthUser = {
  id: string
  email: string
  name: string
  avatarId?: number
}

type AuthState = {
  user: AuthUser | null
  isLoggedIn: boolean
  setUser: (user: AuthUser | null) => void
  updateUserData: (patch: Partial<AuthUser>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: Boolean(user) }),
  updateUserData: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : null,
    })),
  logout: () => set({ user: null, isLoggedIn: false }),
}))