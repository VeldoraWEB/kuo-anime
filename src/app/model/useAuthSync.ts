import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/shared/api/supabase'
import { useAuthStore, sessionToUser } from '@/entities/user'

export function useAuthSync() {
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(sessionToUser(data.session.user))
      }
    })

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(sessionToUser(session.user))
      } else if (event === 'SIGNED_OUT') {
        logout()
        queryClient.clear()
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [setUser, logout, queryClient])
}