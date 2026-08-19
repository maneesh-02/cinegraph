import { Link } from "react-router-dom";
import { useFetch } from "../api/useFetch";
import { getStats } from "../api/stats";
import { Loader, ErrorState } from "../components/States";
import { Sprocket } from "../components/Sprocket";

const STAT_LABELS = [
  { key: "movies", label: "Movies" },
  { key: "actors", label: "Actors" },
  { key: "directors", label: "Directors" },
  { key: "genres", label: "Genres" },
  { key: "studios", label: "Studios" },
];

export default function Dashboard() {
  const { data: stats, status, error, reload } = useFetch(getStats, []);

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">Now Screening</div>
        <h1>CineGraph</h1>
        <p style={{ maxWidth: 560, marginTop: 14, fontSize: "1.05rem" }}>
          CineGraph lets you explore how movies, actors, directors, genres and
          studios are connected — trace an actor to their collaborators, or
          find films linked through a shared cast.
        </p>
        <Link to="/movies" className="btn btn-primary" style={{ marginTop: 22 }}>
          Explore Movies
        </Link>
      </div>

      <Sprocket />

      {status === "loading" && <Loader label="Loading library stats" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "success" && (
        <div className="stat-grid">
          {STAT_LABELS.map(({ key, label }) => (
            <div className="stat-card" key={key}>
              <div className="stat-value">{stats[key] ?? 0}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
