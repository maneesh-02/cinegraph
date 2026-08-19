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
    connectionTimeout: 10000,
    disableLosslessIntegers: true,
  }
);

async function verifyConnection() {
  try {
    await driver.verifyConnectivity();
    console.log("[db] Connected to CognDB successfully.");
  } catch (err) {
    console.error("[db] Failed to connect to CognDB:", err.message);
  }
}


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






