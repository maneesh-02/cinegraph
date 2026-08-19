import { useFetch } from "../api/useFetch";
import { getDirectors } from "../api/directors";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { Sprocket } from "../components/Sprocket";

export default function Directors() {
  const { data: directors, status, error, reload } = useFetch(getDirectors, []);

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">Behind The Camera</div>
        <h1>Directors</h1>
      </div>

      <Sprocket />

      {status === "loading" && <Loader label="Loading directors" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "success" && directors.length === 0 && (
        <EmptyState title="No directors found" />
      )}
      {status === "success" && directors.length > 0 && (
        <div className="grid">
          {directors.map((d) => (
            <div className="card" key={d.id}>
              <div className="card-sprocket-top" aria-hidden="true" />
              <div className="card-body">
                <div className="card-title">{d.name}</div>
                <div className="card-meta">
                  <span>
                    {d.movieCount} film{d.movieCount === 1 ? "" : "s"} directed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
