export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}