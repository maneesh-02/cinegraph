const actorService = require("../services/actorService");

async function getActors(req, res, next) {
  try {
    const actors = await actorService.listActors();
    res.json({ data: actors });
  } catch (err) {
    next(err);
  }
}

async function getActor(req, res, next) {
  try {
    const { id } = req.params;
    const actor = await actorService.getActorById(id);
    if (!actor) {
      return res.status(404).json({ error: `Actor '${id}' not found.` });
    }
    res.json({ data: actor });
  } catch (err) {
    next(err);
  }
}

async function getActorMovies(req, res, next) {
  try {
    const { id } = req.params;
    const actor = await actorService.getActorById(id);
    if (!actor) {
      return res.status(404).json({ error: `Actor '${id}' not found.` });
    }
    const movies = await actorService.getMoviesByActor(id);
    res.json({ data: movies });
  } catch (err) {
    next(err);
  }
}

async function getActorDirectors(req, res, next) {
  try {
    const { id } = req.params;
    const actor = await actorService.getActorById(id);
    if (!actor) {
      return res.status(404).json({ error: `Actor '${id}' not found.` });
    }
    const directors = await actorService.getDirectorsForActor(id);
    res.json({ data: directors });
  } catch (err) {
    next(err);
  }
}

module.exports = { getActors, getActor, getActorMovies, getActorDirectors };
