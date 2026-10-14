import { useAuthStore, useMyRating, useSetRating } from '@/entities/user'
import StarRating from '@/shared/ui/StarRating'

type Props = {
  animeId: string
  title: string
  size?: 'sm' | 'md'
}

export default function RateAnime({ animeId, title, size = 'sm' }: Props) {
  const user = useAuthStore((s) => s.user)
  const myRating = useMyRating(animeId)
  const setRating = useSetRating()

  return (
    <StarRating
      value={myRating ?? 0}
      onChange={
        user ? (v) => setRating.mutate({ animeId, value: v }) : undefined
      }
      readOnly={!user}
      size={size}
      label={`Your rating for ${title}`}
    />
  )
}