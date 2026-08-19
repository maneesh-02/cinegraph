const { runQuery } = require("../db/driver");

async function listMovies() {
  const records = await runQuery(
    `MATCH (m:Movie)
     OPTIONAL MATCH (m)-[:BELONGS_TO]->(g:Genre)
     RETURN m.id AS id, m.title AS title, m.releaseYear AS releaseYear,
            m.rating AS rating, collect(DISTINCT g.name) AS genres
     ORDER BY m.title`
  );
  return records.map((r) => r.toObject());
}

async function getMovieById(id) {
  const records = await runQuery(
    `MATCH (m:Movie {id: $id})
     OPTIONAL MATCH (m)-[:DIRECTED_BY]->(d:Director)
     OPTIONAL MATCH (m)-[:PRODUCED_BY]->(s:Studio)
     OPTIONAL MATCH (m)-[:BELONGS_TO]->(g:Genre)
     RETURN m.id AS id, m.title AS title, m.releaseYear AS releaseYear,
            m.rating AS rating, m.description AS description,
            d.id AS directorId, d.name AS directorName,
            s.id AS studioId, s.name AS studioName,
            collect(DISTINCT g.name) AS genres`,
    { id }
  );
  if (records.length === 0) return null;
  return records[0].toObject();
}

// QUERY 2 — Movie <- ACTED_IN <- Actor (1 hop)
async function getActorsInMovie(id) {
  const records = await runQuery(
    `MATCH (m:Movie {id: $id})<-[:ACTED_IN]-(a:Actor)
     RETURN a.id AS id, a.name AS name, a.birthYear AS birthYear
     ORDER BY a.name`,
    { id }
  );
  return records.map((r) => r.toObject());
}

/**
 * QUERY 4 — Connected movies.
 * Movie <- ACTED_IN <- Actor -> ACTED_IN -> OtherMovie (2 hops)
 * Finds other movies that share at least one actor with the given movie,
 * excludes the original movie, and returns a shared-actor count so the UI
 * can say "Connected through N shared actors". This is the query that
 * makes the graph aspect of the app visible to the user.
 */
async function getConnectedMovies(id) {
  const records = await runQuery(
    `MATCH (m:Movie {id: $id})<-[:ACTED_IN]-(a:Actor)-[:ACTED_IN]->(other:Movie)
     WHERE other.id <> $id
     WITH other, collect(DISTINCT a.name) AS sharedActors, count(DISTINCT a) AS sharedActorCount
     RETURN other.id AS id, other.title AS title, other.releaseYear AS releaseYear,
            other.rating AS rating, sharedActors, sharedActorCount
     ORDER BY sharedActorCount DESC, other.title`,
    { id }
  );
  return records.map((r) => r.toObject());
}

/**
 * QUERY 5 — Graph exploration / highlight query.
 * Movie -> ACTED_IN -> Actor -> ACTED_IN -> OtherMovie -> DIRECTED_BY -> Director (3 hops)
 * Returns movies connected via shared actors, together with who directed
 * each connected movie. This is the query the README highlights as
 * genuinely graph-oriented: walking outward through people (actors) to
 * find the directors two degrees removed from the starting movie would
 * require several chained joins and an extra aggregation in SQL, whereas
 * here it's one traversal.
 */
async function getExploreGraph(id) {
  const records = await runQuery(
    `MATCH (m:Movie {id: $id})<-[:ACTED_IN]-(a:Actor)-[:ACTED_IN]->(other:Movie)
     WHERE other.id <> $id
     MATCH (other)-[:DIRECTED_BY]->(d:Director)
     WITH other, d, collect(DISTINCT a.name) AS viaActors
     RETURN other.id AS movieId, other.title AS movieTitle, other.releaseYear AS releaseYear,
            d.id AS directorId, d.name AS directorName, viaActors
     ORDER BY other.title`,
    { id }
  );
  return records.map((r) => r.toObject());
}

/**
 * QUERY 6 — Discovery: shared actor AND shared genre.
 * Demonstrates combining two relationship conditions in one traversal:
 * the candidate movie must connect to the source movie through both a
 * shared actor and a shared genre.
 */
async function getDiscoveryMatches(id) {
  const records = await runQuery(
    `MATCH (m:Movie {id: $id})-[:BELONGS_TO]->(g:Genre)<-[:BELONGS_TO]-(other:Movie)
     WHERE other.id <> $id
     MATCH (m)<-[:ACTED_IN]-(a:Actor)-[:ACTED_IN]->(other)
     WITH other, collect(DISTINCT g.name) AS sharedGenres, collect(DISTINCT a.name) AS sharedActors
     RETURN other.id AS id, other.title AS title, other.releaseYear AS releaseYear,
            sharedGenres, sharedActors
     ORDER BY other.title`,
    { id }
  );
  return records.map((r) => r.toObject());
}

module.exports = {
  listMovies,
  getMovieById,
  getActorsInMovie,
  getConnectedMovies,
  getExploreGraph,
  getDiscoveryMatches,
};
