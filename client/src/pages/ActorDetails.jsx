import { useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../api/useFetch";
import { getActor, getActorMovies, getActorDirectors } from "../api/actors";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { MovieCard } from "../components/MovieCard";
import { Sprocket } from "../components/Sprocket";

export default function ActorDetails() {
  const { id } = useParams();

  const fetchAll = useCallback(async () => {
    const [actor, movies, directors] = await Promise.all([
      getActor(id),
      getActorMovies(id),
      getActorDirectors(id),
    ]);
    return { actor, movies, directors };
  }, [id]);

  const { data, status, error, reload } = useFetch(fetchAll, [id]);

  const genres = useMemo(() => {
    if (!data) return [];
    const set = new Set();
    data.movies.forEach((m) => (m.genres || []).forEach((g) => g && set.add(g)));
    return [...set];
  }, [data]);

  return (
    <div className="page">
      {status === "loading" && <Loader label="Loading actor" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}

      {status === "success" && (
        <>
          <div className="page-header">
            <Link to="/actors" className="eyebrow">
              ← Back to Actors
            </Link>
            <h1>{data.actor.name}</h1>
            <p style={{ marginTop: 10 }}>Born {data.actor.birthYear}</p>
          </div>

          <Sprocket />

          <section>
            <div className="section-title">
              <h2>Genres</h2>
              <span className="section-count">
                derived from {data.movies.length} movie
                {data.movies.length === 1 ? "" : "s"}
              </span>
            </div>
            {genres.length === 0 ? (
              <EmptyState title="No genre data" />
            ) : (
              <div className="tag-row" style={{ marginBottom: 8 }}>
                {genres.map((g) => (
                  <span className="tag tag-accent" key={g}>
                    {g}
                  </span>
                ))}
              </div>
            )}
          </section>

          <Sprocket />

          <section>
            <div className="section-title">
              <h2>Directors Worked With</h2>
              <span className="section-count">{data.directors.length}</span>
            </div>
            {data.directors.length === 0 ? (
              <EmptyState title="No director data" />
            ) : (
              <div className="grid" style={{ marginBottom: 8 }}>
                {data.directors.map((d) => (
                  <div className="card" key={d.id}>
                    <div className="card-sprocket-top" aria-hidden="true" />
                    <div className="card-body">
                      <div className="card-title">{d.name}</div>
                      <p style={{ fontSize: "0.85rem" }}>
                        {d.movieCount} shared film{d.movieCount === 1 ? "" : "s"}:{" "}
                        {d.movies.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Sprocket />

          <section>
            <div className="section-title">
              <h2>Movies</h2>
              <span className="section-count">{data.movies.length}</span>
            </div>
            {data.movies.length === 0 ? (
              <EmptyState title="No movies recorded" />
            ) : (
              <div className="grid">
                {data.movies.map((m) => (
                  <MovieCard movie={m} key={m.id} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
