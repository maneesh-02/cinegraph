const { driver } = require("../db/driver");

async function getHealth(req, res) {
  try {
    await driver.verifyConnectivity();
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", database: "unreachable", message: err.message });
  }
}

module.exports = { getHealth };
