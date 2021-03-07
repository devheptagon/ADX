const sectorRouter = require('express').Router();
const sectorController = require('../controllers/sector');

/**
 * [GET]
 */
sectorRouter.get('/', sectorController.sectorGet);

module.exports = sectorRouter;