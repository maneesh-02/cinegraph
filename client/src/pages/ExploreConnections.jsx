import { useCallback, useMemo, useState } from "react";
import { useFetch } from "../api/useFetch";
import { getMovies, getMovie, getMovieExplore } from "../api/movies";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { Sprocket } from "../components/Sprocket";

export default function ExploreConnections() {
  const { data: movies, status: listStatus, error: listError, reload: reloadList } =
    useFetch(getMovies, []);
  const [selectedId, setSelectedId] = useState("");

  const fetchExplore = useCallback(async () => {
    if (!selectedId) return null;
    const [movie, graph] = await Promise.all([
      getMovie(selectedId),
      getMovieExplore(selectedId),
    ]);
    return { movie, graph };
  }, [selectedId]);

  const { data, status, error, reload } = useFetch(fetchExplore, [selectedId]);

  // Group the flat query-5 result rows (movie -> actor -> other movie -> director)
  // by the connected movie, since several actors can link to the same film.
  const grouped = useMemo(() => {
    if (!data?.graph) return [];
    const map = new Map();
    data.graph.forEach((row) => {
      if (!map.has(row.movieId)) {
        map.set(row.movieId, {
          movieId: row.movieId,
          movieTitle: row.movieTitle,
          releaseYear: row.releaseYear,
          directorName: row.directorName,
          viaActors: new Set(),
        });
      }
      row.viaActors.forEach((a) => map.get(row.movieId).viaActors.add(a));
    });
    return [...map.values()];
  }, [data]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">Trace The Web</div>
        <h1>Explore Connections</h1>
        <p style={{ marginTop: 12, maxWidth: 560 }}>
          Pick a movie to see how it connects to other films — through shared
          actors, all the way to the directors those films worked with.
        </p>
      </div>

      {listStatus === "loading" && <Loader label="Loading movie list" />}
      {listStatus === "error" && <ErrorState message={listError} onRetry={reloadList} />}

      {listStatus === "success" && (
        <select
          className="search-input"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          aria-label="Select a movie to explore"
        >
          <option value="">Select a movie…</option>
          {movies.map((m) => (
            <option value={m.id} key={m.id}>
              {m.title} ({m.releaseYear})
            </option>
          ))}
        </select>
      )}

      <Sprocket />

      {!selectedId && (
        <EmptyState
          title="No movie selected"
          message="Choose a movie above to trace its connections."
        />
      )}

      {selectedId && status === "loading" && <Loader label="Tracing connections" />}
      {selectedId && status === "error" && (
        <ErrorState message={error} onRetry={reload} />
      )}

      {selectedId && status === "success" && data && (
        <>
          <div className="chain-node" style={{ borderColor: "var(--accent-dim)" }}>
            <span className="chain-role">Start</span>
            <div>
              <div className="card-title">{data.movie.title}</div>
              <div className="card-meta">
                <span>{data.movie.releaseYear}</span>
                <span>dir. {data.movie.directorName}</span>
              </div>
            </div>
          </div>

          {grouped.length === 0 ? (
            <div style={{ marginTop: 24 }}>
              <EmptyState
                title="No connections found"
                message="This movie's cast doesn't overlap with any other film in the library."
              />
            </div>
          ) : (
            <div className="chain" style={{ marginTop: 8 }}>
              {grouped.map((g) => (
                <div key={g.movieId}>
                  <div className="chain-arrow">
                    via {[...g.viaActors].join(", ")} ↓
                  </div>
                  <div className="chain-node">
                    <span className="chain-role">Movie</span>
                    <div style={{ flex: 1 }}>
                      <div className="card-title">{g.movieTitle}</div>
                      <div className="card-meta">
                        <span>{g.releaseYear}</span>
                      </div>
                    </div>
                    <span className="chain-role" style={{ width: "auto" }}>
                      Director
                    </span>
                    <div className="tag tag-accent">{g.directorName}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
