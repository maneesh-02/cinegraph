// Idempotent seed script for CineGraph.
// Uses MERGE (not CREATE) keyed on each node's `id` property, so running
// `npm run seed` multiple times updates existing data instead of duplicating it.
// All values are passed as parameters via UNWIND — no string concatenation.

require("dotenv").config();
const { driver, runQuery } = require("../src/db/driver");
const { genres, studios, directors, actors, movies } = require("./seedData");

async function seedGenres() {
  await runQuery(
    `UNWIND $rows AS row
     MERGE (g:Genre {id: row.id})
     SET g.name = row.name`,
    { rows: genres }
  );
  console.log(`  Genres: ${genres.length}`);
}

async function seedStudios() {
  await runQuery(
    `UNWIND $rows AS row
     MERGE (s:Studio {id: row.id})
     SET s.name = row.name`,
    { rows: studios }
  );
  console.log(`  Studios: ${studios.length}`);
}

async function seedDirectors() {
  await runQuery(
    `UNWIND $rows AS row
     MERGE (d:Director {id: row.id})
     SET d.name = row.name`,
    { rows: directors }
  );
  console.log(`  Directors: ${directors.length}`);
}

async function seedActors() {
  await runQuery(
    `UNWIND $rows AS row
     MERGE (a:Actor {id: row.id})
     SET a.name = row.name, a.birthYear = row.birthYear`,
    { rows: actors }
  );
  console.log(`  Actors: ${actors.length}`);
}

async function seedMovies() {
  await runQuery(
    `UNWIND $rows AS row
     MERGE (m:Movie {id: row.id})
     SET m.title = row.title, m.releaseYear = row.releaseYear,
         m.rating = row.rating, m.description = row.description
     WITH m, row
     MATCH (d:Director {id: row.directorId})
     MATCH (s:Studio {id: row.studioId})
     MERGE (m)-[:DIRECTED_BY]->(d)
     MERGE (m)-[:PRODUCED_BY]->(s)`,
    { rows: movies }
  );
  console.log(`  Movies: ${movies.length}`);

  const movieGenrePairs = movies.flatMap((m) =>
    m.genreIds.map((genreId) => ({ movieId: m.id, genreId }))
  );
  await runQuery(
    `UNWIND $rows AS row
     MATCH (m:Movie {id: row.movieId})
     MATCH (g:Genre {id: row.genreId})
     MERGE (m)-[:BELONGS_TO]->(g)`,
    { rows: movieGenrePairs }
  );
  console.log(`  Movie-Genre edges: ${movieGenrePairs.length}`);

  const actorMoviePairs = movies.flatMap((m) =>
    m.actorIds.map((actorId) => ({ movieId: m.id, actorId }))
  );
  await runQuery(
    `UNWIND $rows AS row
     MATCH (a:Actor {id: row.actorId})
     MATCH (m:Movie {id: row.movieId})
     MERGE (a)-[:ACTED_IN]->(m)`,
    { rows: actorMoviePairs }
  );
  console.log(`  Actor-Movie edges: ${actorMoviePairs.length}`);
}

async function seed() {
  console.log("Seeding CineGraph database...\n");
  try {
    await seedGenres();
    await seedStudios();
    await seedDirectors();
    await seedActors();
    await seedMovies();
    console.log("\nSeed complete. Database is ready.");
  } catch (err) {
    console.error("\nSeed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

seed();





// // Idempotent seed script for CineGraph.
// // Uses MERGE (not CREATE) keyed on each node's `id` property, so running
// // `npm run seed` multiple times updates existing data instead of duplicating it.
// // All values are passed as parameters via UNWIND — no string concatenation.

// require("dotenv").config();
// const { driver, runQuery } = require("../src/db/driver");
// const { genres, studios, directors, actors, movies } = require("./seedData");

// async function seedGenres() {
//   await runQuery(
//     `UNWIND $rows AS row
//      MERGE (g:Genre {id: row.id})
//      SET g.name = row.name`,
//     { rows: genres }
//   );
//   console.log(`  Genres: ${genres.length}`);
// }

// async function seedStudios() {
//   await runQuery(
//     `UNWIND $rows AS row
//      MERGE (s:Studio {id: row.id})
//      SET s.name = row.name`,
//     { rows: studios }
//   );
//   console.log(`  Studios: ${studios.length}`);
// }

// async function seedDirectors() {
//   await runQuery(
//     `UNWIND $rows AS row
//      MERGE (d:Director {id: row.id})
//      SET d.name = row.name`,
//     { rows: directors }
//   );
//   console.log(`  Directors: ${directors.length}`);
// }

// async function seedActors() {
//   await runQuery(
//     `UNWIND $rows AS row
//      MERGE (a:Actor {id: row.id})
//      SET a.name = row.name, a.birthYear = row.birthYear`,
//     { rows: actors }
//   );
//   console.log(`  Actors: ${actors.length}`);
// }

// async function seedMovies() {
//   await runQuery(
//     `UNWIND $rows AS row
//      MERGE (m:Movie {id: row.id})
//      SET m.title = row.title, m.releaseYear = row.releaseYear,
//          m.rating = row.rating, m.description = row.description
//      WITH m, row
//      MATCH (d:Director {id: row.directorId})
//      MATCH (s:Studio {id: row.studioId})
//      MERGE (m)-[:DIRECTED_BY]->(d)
//      MERGE (m)-[:PRODUCED_BY]->(s)`,
//     { rows: movies }
//   );
//   console.log(`  Movies: ${movies.length}`);

//   const movieGenrePairs = movies.flatMap((m) =>
//     m.genreIds.map((genreId) => ({ movieId: m.id, genreId }))
//   );
//   await runQuery(
//     `UNWIND $rows AS row
//      MATCH (m:Movie {id: row.movieId})
//      MATCH (g:Genre {id: row.genreId})
//      MERGE (m)-[:BELONGS_TO]->(g)`,
//     { rows: movieGenrePairs }
//   );
//   console.log(`  Movie-Genre edges: ${movieGenrePairs.length}`);

//   const actorMoviePairs = movies.flatMap((m) =>
//     m.actorIds.map((actorId) => ({ movieId: m.id, actorId }))
//   );
//   await runQuery(
//     `UNWIND $rows AS row
//      MATCH (a:Actor {id: row.actorId})
//      MATCH (m:Movie {id: row.movieId})
//      MERGE (a)-[:ACTED_IN]->(m)`,
//     { rows: actorMoviePairs }
//   );
//   console.log(`  Actor-Movie edges: ${actorMoviePairs.length}`);
// }

// async function seed() {
//   console.log("Seeding CineGraph database...\n");
//   try {
//     await seedGenres();
//     await seedStudios();
//     await seedDirectors();
//     await seedActors();
//     await seedMovies();
//     console.log("\nSeed complete. Database is ready.");
//   } catch (err) {
//     console.error("\nSeed failed:", err.message);
//     process.exitCode = 1;
//   } finally {
//     await driver.close();
//   }
// }

// seed();
