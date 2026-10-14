import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, X } from "lucide-react";
import type { Anime } from "@/entities/anime";
import { cn } from "@/shared/lib";
import { createPortal } from "react-dom";
import SearchResults from "./SearchResults";
import { useAnimeSearch } from "./useAnimeSearch";

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { results, isLoading } = useAnimeSearch(query);

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() && results.length > 0) {
      setIsOpen(true);
    }
  }, [results, query]);

  useEffect(() => {
    if (isMobileOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 50);
    }
  }, [isMobileOpen]);

  const goTo = (anime: Anime) => {
    navigate(`/anime/${anime.slug}`);
    setQuery("");
    setIsOpen(false);
    setIsMobileOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) goTo(results[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsMobileOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-white/5 bg-white/5 pl-9 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.07] focus:ring-4 focus:ring-violet-500/15";

  return (
    <>
      <div
        ref={containerRef}
        className="relative ml-3 hidden w-full max-w-md lg:block"
      >
        <form role="search" onSubmit={handleSubmit}>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search titles.."
            className={inputClass}
          />
          {isLoading && (
            <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-violet-400" />
          )}
        </form>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[400px] overflow-y-auto rounded-xl border border-white/10 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">
            <SearchResults
              results={results}
              isLoading={isLoading}
              onSelect={goTo}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Поиск"
        className="ml-2 flex size-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
      >
        <Search className="size-4" />
      </button>

      {isMobileOpen &&
        createPortal(
          <>
            <button
              type="button"
              aria-label="Закрыть поиск"
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-30 cursor-default lg:hidden"
            />

            <div className="fixed inset-x-0 top-16 z-40 grid max-h-[70vh] grid-rows-[auto_minmax(0,1fr)] border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl lg:hidden">
              <form
                role="search"
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-b border-white/5 p-3"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    ref={mobileInputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search anime..."
                    className={cn(inputClass, "h-11")}
                  />
                  {isLoading && (
                    <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-violet-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Закрыть поиск"
                  className="flex size-11 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </form>

              <div className="overflow-y-auto">
                {query.trim() && (
                  <SearchResults
                    results={results}
                    isLoading={isLoading}
                    onSelect={goTo}
                    fullWidth
                  />
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
