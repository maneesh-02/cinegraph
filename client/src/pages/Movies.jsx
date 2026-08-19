import { useMemo, useState } from "react";
import { useFetch } from "../api/useFetch";
import { getMovies } from "../api/movies";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { MovieCard } from "../components/MovieCard";
import { Sprocket } from "../components/Sprocket";

export default function Movies() {
  const { data: movies, status, error, reload } = useFetch(getMovies, []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!movies) return [];
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.genres || []).some((g) => g?.toLowerCase().includes(q))
    );
  }, [movies, query]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">The Library</div>
        <h1>Movies</h1>
      </div>

      <input
        className="search-input"
        placeholder="Search by title or genre…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
      />

      <Sprocket />

      {status === "loading" && <Loader label="Loading movies" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "success" && filtered.length === 0 && (
        <EmptyState
          title="No movies found"
          message="Try a different title or genre."
        />
      )}
      {status === "success" && filtered.length > 0 && (
        <div className="grid">
          {filtered.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
