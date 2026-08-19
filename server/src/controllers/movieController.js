const movieService = require("../services/movieService");

async function getMovies(req, res, next) {
  try {
    const movies = await movieService.listMovies();
    res.json({ data: movies });
  } catch (err) {
    next(err);
  }
}

async function getMovie(req, res, next) {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: `Movie '${id}' not found.` });
    }
    res.json({ data: movie });
  } catch (err) {
    next(err);
  }
}

async function getMovieActors(req, res, next) {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: `Movie '${id}' not found.` });
    }
    const actors = await movieService.getActorsInMovie(id);
    res.json({ data: actors });
  } catch (err) {
    next(err);
  }
}

async function getMovieConnections(req, res, next) {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: `Movie '${id}' not found.` });
    }
    const connections = await movieService.getConnectedMovies(id);
    res.json({ data: connections });
  } catch (err) {
    next(err);
  }
}

async function getMovieExplore(req, res, next) {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: `Movie '${id}' not found.` });
    }
    const graph = await movieService.getExploreGraph(id);
    res.json({ data: graph });
  } catch (err) {
    next(err);
  }
}

async function getMovieDiscover(req, res, next) {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: `Movie '${id}' not found.` });
    }
    const matches = await movieService.getDiscoveryMatches(id);
    res.json({ data: matches });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMovies,
  getMovie,
  getMovieActors,
  getMovieConnections,
  getMovieExplore,
  getMovieDiscover,
};
