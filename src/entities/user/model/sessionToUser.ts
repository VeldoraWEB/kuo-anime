import type { User } from '@supabase/supabase-js'
import type { AuthUser } from './useAuthStore'

export function sessionToUser(u: User): AuthUser {
  return {
    id: u.id,
    email: u.email ?? '',
    name: u.user_metadata?.name ?? u.email?.split('@')[0] ?? 'User',
    avatarId: u.user_metadata?.avatarId,
  }
}