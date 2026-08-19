const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.get("/:id/actors", movieController.getMovieActors);
router.get("/:id/connections", movieController.getMovieConnections);
router.get("/:id/explore", movieController.getMovieExplore);
router.get("/:id/discover", movieController.getMovieDiscover);

module.exports = router;
