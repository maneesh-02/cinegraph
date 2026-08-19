const directorService = require("../services/directorService");

async function getDirectors(req, res, next) {
  try {
    const directors = await directorService.listDirectors();
    res.json({ data: directors });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDirectors };
