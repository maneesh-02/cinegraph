const { runQuery } = require("../db/driver");

async function listGenres() {
  const records = await runQuery(
    `MATCH (g:Genre)
     OPTIONAL MATCH (m:Movie)-[:BELONGS_TO]->(g)
     RETURN g.id AS id, g.name AS name, count(DISTINCT m) AS movieCount
     ORDER BY g.name`
  );
  return records.map((r) => r.toObject());
}

module.exports = { listGenres };
