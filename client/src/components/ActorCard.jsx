import { Link } from "react-router-dom";

export function ActorCard({ actor }) {
  return (
    <Link to={`/actors/${actor.id}`} className="card" style={{ display: "block" }}>
      <div className="card-sprocket-top" aria-hidden="true" />
      <div className="card-body">
        <div className="card-title">{actor.name}</div>
        <div className="card-meta">
          <span>Born {actor.birthYear}</span>
        </div>
      </div>
    </Link>
  );
}
