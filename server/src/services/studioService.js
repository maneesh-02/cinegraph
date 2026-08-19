const { runQuery } = require("../db/driver");

async function listStudios() {
  const records = await runQuery(
    `MATCH (s:Studio)
     OPTIONAL MATCH (m:Movie)-[:PRODUCED_BY]->(s)
     RETURN s.id AS id, s.name AS name, count(DISTINCT m) AS movieCount
     ORDER BY s.name`
  );
  return records.map((r) => r.toObject());
}

module.exports = { listStudios };
