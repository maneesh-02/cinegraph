const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

router.get("/", actorController.getActors);
router.get("/:id", actorController.getActor);
router.get("/:id/movies", actorController.getActorMovies);
router.get("/:id/directors", actorController.getActorDirectors);

module.exports = router;
