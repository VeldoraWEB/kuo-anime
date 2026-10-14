import { Link, useParams } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import { cn, getAssetUrl } from "@/shared/lib";
import { useAnimeBySlug } from "@/entities/anime";
import { PlayerSection } from "@/widgets/video-player";
import { glass } from "@/shared/config/glass";
import { RateAnime } from "@/features/rate-anime";
import { ToggleMyListButton } from "@/features/toggle-my-list";

export default function WatchPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: anime, isLoading, error } = useAnimeBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-violet-400" />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <h1 className="text-2xl font-bold text-white">Anime not found</h1>
        <p className="text-sm text-zinc-500">
          The title with slug "{slug}" doesn't exist.
        </p>
        <Link
          to="/"
          className="text-sm font-medium text-violet-400 hover:text-cyan-300"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section
        aria-labelledby="watch-title"
        className={cn(
          glass,
          "grid gap-6 rounded-3xl p-5 sm:p-8 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr]",
        )}
      >
        <div className="relative mx-auto w-44 md:w-full">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-600/40 to-cyan-500/30 opacity-60 blur-2xl"
          />
          <img
            src={getAssetUrl(anime.image)}
            alt={`${anime.title} poster`}
            className="relative aspect-[2/3] w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((g) => (
              <span
                key={g}
                className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
              >
                {g}
              </span>
            ))}
          </div>
          <h1
            id="watch-title"
            className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {anime.title}
          </h1>
          <p className="max-w-2xl text-pretty leading-relaxed text-zinc-400">
            {anime.synopsis}
          </p>

          <dl className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/5 pt-5">
            <div className="flex flex-col gap-1.5">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Rating
              </dt>
              <dd>
                <RateAnime animeId={anime.id} title={anime.title} size="md" />
                {(anime.ratingCount ?? 0) > 0 && (
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Rating: {anime.rating?.toFixed(1) ?? "0.0"} (
                    {anime.ratingCount ?? 0})
                  </p>
                )}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Year
              </dt>
              <dd className="flex items-center gap-1.5 font-mono text-lg font-semibold text-white">
                <Calendar className="size-4 text-cyan-400" aria-hidden="true" />
                {anime.year}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Episodes
              </dt>
              <dd className="flex items-center gap-3">
                <span className="font-mono text-lg font-semibold text-white">
                  {anime.episodesAired ?? 0}
                  <span className="text-zinc-500">/{anime.episodes}</span>
                </span>
                {anime.episodesAired != null && anime.episodes > 0 && (
                  <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                      style={{
                        width: `${Math.min((anime.episodesAired / anime.episodes) * 100, 100)}%`,
                      }}
                    />
                  </span>
                )}
              </dd>
            </div>
            <ToggleMyListButton animeId={anime.id} variant="page" />
          </dl>
        </div>
      </section>

      

      <PlayerSection anime={anime} />

      <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-300">
         Если видео не загружается — попробуйте{' '}
         <a
           href="https://one.one.one.one/"
           target="_blank"
           rel="noopener noreferrer"
           className="font-semibold underline decoration-dotted underline-offset-2 hover:text-amber-200"
           >
            Cloudflare WARP (1.1.1.1)
          </a>{' '}
         или включите VPN.
      </p>

    </div>
  );
}
