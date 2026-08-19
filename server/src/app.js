require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { verifyConnection } = require("./db/driver");

const healthRoutes = require("./routes/healthRoutes");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const directorRoutes = require("./routes/directorRoutes");
const genreRoutes = require("./routes/genreRoutes");
const studioRoutes = require("./routes/studioRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/studios", studioRoutes);
app.use("/api/stats", statsRoutes);

// Fallback for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error handler. Every controller forwards errors here via
// next(err) so we have one place that decides status codes and logging.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[error]", err);

  // neo4j-driver throws typed errors with a `code` field for connectivity
  // issues (e.g. ServiceUnavailable) — surface those as 503, not 500.
  if (err.code && String(err.code).includes("ServiceUnavailable")) {
    return res.status(503).json({ error: "Database is currently unavailable. Please try again shortly." });
  }

  res.status(500).json({ error: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`[server] CineGraph API listening on port ${PORT}`);
  await verifyConnection();
});

module.exports = app;
