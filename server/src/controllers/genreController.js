const genreService = require("../services/genreService");

async function getGenres(req, res, next) {
  try {
    const genres = await genreService.listGenres();
    res.json({ data: genres });
  } catch (err) {
    next(err);
  }
}

module.exports = { getGenres };
