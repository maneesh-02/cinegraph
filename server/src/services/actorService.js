const { runQuery } = require("../db/driver");

async function listActors() {
  const records = await runQuery(
    `MATCH (a:Actor)
     RETURN a.id AS id, a.name AS name, a.birthYear AS birthYear
     ORDER BY a.name`
  );
  return records.map((r) => r.toObject());
}

async function getActorById(id) {
  const records = await runQuery(
    `MATCH (a:Actor {id: $id})
     RETURN a.id AS id, a.name AS name, a.birthYear AS birthYear`,
    { id }
  );
  if (records.length === 0) return null;
  return records[0].toObject();
}

// QUERY 1 — Actor -> ACTED_IN -> Movie (1 hop)
async function getMoviesByActor(id) {
  const records = await runQuery(
    `MATCH (a:Actor {id: $id})-[:ACTED_IN]->(m:Movie)
     OPTIONAL MATCH (m)-[:BELONGS_TO]->(g:Genre)
     RETURN m.id AS id, m.title AS title, m.releaseYear AS releaseYear,
            m.rating AS rating, collect(DISTINCT g.name) AS genres
     ORDER BY m.releaseYear DESC`,
    { id }
  );
  return records.map((r) => r.toObject());
}

/**
 * QUERY 3 — Actor -> ACTED_IN -> Movie -> DIRECTED_BY -> Director (2 hops)
 * Finds directors who directed movies featuring this actor, with the
 * shared movie titles so the UI can show "worked together on X, Y".
 */
async function getDirectorsForActor(id) {
  const records = await runQuery(
    `MATCH (a:Actor {id: $id})-[:ACTED_IN]->(m:Movie)-[:DIRECTED_BY]->(d:Director)
     WITH d, collect(DISTINCT m.title) AS movies, count(DISTINCT m) AS movieCount
     RETURN d.id AS id, d.name AS name, movies, movieCount
     ORDER BY movieCount DESC, d.name`,
    { id }
  );
  return records.map((r) => r.toObject());
}

module.exports = { listActors, getActorById, getMoviesByActor, getDirectorsForActor };
