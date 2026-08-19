import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../api/useFetch";
import { getMovie, getMovieActors, getMovieConnections } from "../api/movies";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { Sprocket } from "../components/Sprocket";

export default function MovieDetails() {
  const { id } = useParams();

  const fetchAll = useCallback(async () => {
    const [movie, actors, connections] = await Promise.all([
      getMovie(id),
      getMovieActors(id),
      getMovieConnections(id),
    ]);
    return { movie, actors, connections };
  }, [id]);

  const { data, status, error, reload } = useFetch(fetchAll, [id]);

  return (
    <div className="page">
      {status === "loading" && <Loader label="Loading movie" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}

      {status === "success" && (
        <>
          <div className="page-header">
            <Link to="/movies" className="eyebrow">
              ← Back to Movies
            </Link>

            <div className="detail-hero">
              <div className="detail-poster" aria-hidden="true">
                {data.movie.title
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="detail-info">
                <h1>{data.movie.title}</h1>
                <div className="tag-row" style={{ marginTop: 10 }}>
                  <span className="rating-badge">★ {data.movie.rating}</span>
                  {(data.movie.genres || []).filter(Boolean).map((g) => (
                    <span className="tag tag-accent" key={g}>
                      {g}
                    </span>
                  ))}
                </div>
                <p style={{ marginTop: 14 }}>{data.movie.description}</p>

                <div className="detail-facts">
                  <div>
                    <div className="fact-label">Release Year</div>
                    <div className="fact-value">{data.movie.releaseYear}</div>
                  </div>
                  <div>
                    <div className="fact-label">Director</div>
                    <div className="fact-value">
                      {data.movie.directorName || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="fact-label">Studio</div>
                    <div className="fact-value">
                      {data.movie.studioName || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Sprocket />

          <section>
            <div className="section-title">
              <h2>Cast</h2>
              <span className="section-count">{data.actors.length} actors</span>
            </div>
            {data.actors.length === 0 ? (
              <EmptyState title="No cast recorded" />
            ) : (
              <div className="chip-list">
                {data.actors.map((a) => (
                  <Link key={a.id} to={`/actors/${a.id}`} className="tag">
                    {a.name}
                  </Link>
                ))}
              </div>
            )}
          </section>

          <Sprocket />

          <section>
            <div className="section-title">
              <h2>Connected Movies</h2>
              <span className="section-count">
                via shared cast — {data.connections.length} found
              </span>
            </div>
            {data.connections.length === 0 ? (
              <EmptyState
                title="No connections found"
                message="None of this movie's cast appear in other films in the library."
              />
            ) : (
              <div className="grid">
                {data.connections.map((c) => (
                  <Link to={`/movies/${c.id}`} className="card" key={c.id}>
                    <div className="card-sprocket-top" aria-hidden="true" />
                    <div className="card-body">
                      <div className="card-title">{c.title}</div>
                      <div className="card-meta">
                        <span>{c.releaseYear}</span>
                        <span className="rating-badge">★ {c.rating}</span>
                      </div>
                      <p style={{ fontSize: "0.85rem" }}>
                        Connected through {c.sharedActorCount} shared actor
                        {c.sharedActorCount === 1 ? "" : "s"}:{" "}
                        {c.sharedActors.join(", ")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
