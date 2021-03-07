const locationRouter = require('express').Router();
const locationController = require('../controllers/location');

/**
 * [GET]
 */
locationRouter.get('/', locationController.locationGet);

module.exports = locationRouter;