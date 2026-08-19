const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController");

router.get("/", directorController.getDirectors);

module.exports = router;
