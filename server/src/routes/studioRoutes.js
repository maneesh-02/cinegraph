const express = require("express");
const router = express.Router();
const studioController = require("../controllers/studioController");

router.get("/", studioController.getStudios);

module.exports = router;
