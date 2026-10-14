export type AvatarOption = {
  id: number
  src: string
}

export const AVATARS: AvatarOption[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `/anime/avatars/avatar-${i + 1}.webp`,
}))