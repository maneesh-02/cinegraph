const { runQuery } = require("../db/driver");

async function getStats() {
  const records = await runQuery(
    `MATCH (m:Movie) WITH count(m) AS movies
     MATCH (a:Actor) WITH movies, count(a) AS actors
     MATCH (d:Director) WITH movies, actors, count(d) AS directors
     MATCH (g:Genre) WITH movies, actors, directors, count(g) AS genres
     MATCH (s:Studio) WITH movies, actors, directors, genres, count(s) AS studios
     RETURN movies, actors, directors, genres, studios`
  );
  if (records.length === 0) {
    return { movies: 0, actors: 0, directors: 0, genres: 0, studios: 0 };
  }
  return records[0].toObject();
}

module.exports = { getStats };
