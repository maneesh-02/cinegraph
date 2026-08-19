import { useMemo, useState } from "react";
import { useFetch } from "../api/useFetch";
import { getActors } from "../api/actors";
import { Loader, ErrorState, EmptyState } from "../components/States";
import { ActorCard } from "../components/ActorCard";
import { Sprocket } from "../components/Sprocket";

export default function Actors() {
  const { data: actors, status, error, reload } = useFetch(getActors, []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!actors) return [];
    const q = query.trim().toLowerCase();
    if (!q) return actors;
    return actors.filter((a) => a.name.toLowerCase().includes(q));
  }, [actors, query]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="eyebrow">The Cast</div>
        <h1>Actors</h1>
      </div>

      <input
        className="search-input"
        placeholder="Search by name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search actors"
      />

      <Sprocket />

      {status === "loading" && <Loader label="Loading actors" />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "success" && filtered.length === 0 && (
        <EmptyState title="No actors found" message="Try a different name." />
      )}
      {status === "success" && filtered.length > 0 && (
        <div className="grid">
          {filtered.map((actor) => (
            <ActorCard actor={actor} key={actor.id} />
          ))}
        </div>
      )}
    </div>
  );
}
