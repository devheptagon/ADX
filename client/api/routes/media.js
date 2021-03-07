const mediaRouter = require('express').Router();
const mediaController = require('../controllers/media');

/**
 * [GET]
 */
mediaRouter.get('/', mediaController.mediaGet);

/**
 * [POST]
 */
mediaRouter.post('/', mediaController.mediaPost);

/**
 * [UPDATE]
 */
mediaRouter.patch('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * [DELETE]
 */
mediaRouter.delete('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = mediaRouter;