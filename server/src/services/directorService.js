const { runQuery } = require("../db/driver");

async function listDirectors() {
  const records = await runQuery(
    `MATCH (d:Director)
     OPTIONAL MATCH (m:Movie)-[:DIRECTED_BY]->(d)
     RETURN d.id AS id, d.name AS name, count(DISTINCT m) AS movieCount
     ORDER BY d.name`
  );
  return records.map((r) => r.toObject());
}

module.exports = { listDirectors };
