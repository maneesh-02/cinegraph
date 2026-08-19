const studioService = require("../services/studioService");

async function getStudios(req, res, next) {
  try {
    const studios = await studioService.listStudios();
    res.json({ data: studios });
  } catch (err) {
    next(err);
  }
}

module.exports = { getStudios };
