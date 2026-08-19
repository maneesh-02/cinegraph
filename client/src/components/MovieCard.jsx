import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  const initials = movie.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Link to={`/movies/${movie.id}`} className="card" style={{ display: "block" }}>
      <div className="card-sprocket-top" aria-hidden="true" />
      <div className="card-body">
        <div className="card-title">{movie.title}</div>
        <div className="card-meta">
          <span>{movie.releaseYear}</span>
          <span className="rating-badge">★ {movie.rating}</span>
        </div>
        <div className="tag-row">
          {(movie.genres || []).filter(Boolean).map((g) => (
            <span key={g} className="tag">
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
