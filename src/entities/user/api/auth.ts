import { supabase } from '@/shared/api/supabase'

export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: window.location.origin + import.meta.env.BASE_URL,
    },
  })
  if (error) throw error
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function updateProfile(data: { name?: string; avatarId?: number }) {
  const { data: result, error } = await supabase.auth.updateUser({
    data: {
      name: data.name,
      avatarId: data.avatarId,
    },
  })
  if (error) throw error
  return result.user
}