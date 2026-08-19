// Single shared Neo4j driver instance used across the whole backend.
// CognDB Cloud speaks the Bolt protocol and is compatible with the
// official Neo4j JavaScript driver, so we connect exactly as we would
// to any Neo4j Aura/self-hosted instance.

const neo4j = require("neo4j-driver");

const { COGNODB_URI, COGNODB_USERNAME, COGNODB_PASSWORD } = process.env;

if (!COGNODB_URI || !COGNODB_USERNAME || !COGNODB_PASSWORD) {
  console.error(
    "[db] Missing CognDB connection env vars. Check your .env file against .env.example."
  );
}

const driver = neo4j.driver(
  COGNODB_URI,
  neo4j.auth.basic(COGNODB_USERNAME, COGNODB_PASSWORD),
  {
    // Fail fast instead of hanging the request if the DB is unreachable.
    connectionTimeout: 10000,
    // Neo4j represents integers (e.g. from count()) as {low, high} objects
    // by default, since JS numbers can't safely hold all 64-bit values.
    // This dataset is nowhere near that range, so we opt into plain JS
    // numbers everywhere — otherwise count() results crash React, which
    // can't render a raw object as text.
    disableLosslessIntegers: true,
  }
);

// Verifies connectivity once at startup so we log a clear error early
// rather than surfacing a confusing failure on the first API call.
async function verifyConnection() {
  try {
    await driver.verifyConnectivity();
    console.log("[db] Connected to CognDB successfully.");
  } catch (err) {
    console.error("[db] Failed to connect to CognDB:", err.message);
  }
}

// Every service call should go through this helper so sessions are
// always closed, even if the query throws.
async function runQuery(cypher, params = {}) {
  const session = driver.session();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close();
  }
}

module.exports = { driver, verifyConnection, runQuery };






// // Single shared Neo4j driver instance used across the whole backend.
// // CognDB Cloud speaks the Bolt protocol and is compatible with the
// // official Neo4j JavaScript driver, so we connect exactly as we would
// // to any Neo4j Aura/self-hosted instance.

// const neo4j = require("neo4j-driver");

// const { COGNODB_URI, COGNODB_USERNAME, COGNODB_PASSWORD } = process.env;

// if (!COGNODB_URI || !COGNODB_USERNAME || !COGNODB_PASSWORD) {
//   console.error(
//     "[db] Missing CognDB connection env vars. Check your .env file against .env.example."
//   );
// }

// const driver = neo4j.driver(
//   COGNODB_URI,
//   neo4j.auth.basic(COGNODB_USERNAME, COGNODB_PASSWORD),
//   {
//     // Fail fast instead of hanging the request if the DB is unreachable.
//     connectionTimeout: 10000,
//   }
// );

// // Verifies connectivity once at startup so we log a clear error early
// // rather than surfacing a confusing failure on the first API call.
// async function verifyConnection() {
//   try {
//     await driver.verifyConnectivity();
//     console.log("[db] Connected to CognDB successfully.");
//   } catch (err) {
//     console.error("[db] Failed to connect to CognDB:", err.message);
//   }
// }

// // Every service call should go through this helper so sessions are
// // always closed, even if the query throws.
// async function runQuery(cypher, params = {}) {
//   const session = driver.session();
//   try {
//     const result = await session.run(cypher, params);
//     return result.records;
//   } finally {
//     await session.close();
//   }
// }

// module.exports = { driver, verifyConnection, runQuery };
