const advertRouter = require('express').Router();
const advertController = require('../controllers/advert');

/**
 * [GET]
 */
advertRouter.get('/new', advertController.createID);

/**
 * [GET]
 */
advertRouter.get('/', advertController.advertGet);

/**
 * [GET]
 */
advertRouter.get('/:id', advertController.singleGet);

/**
 * [POST]
 */
advertRouter.post('/', advertController.advertPost);

/**
 * [UPDATE]
 */
advertRouter.patch('/:id', advertController.advertPatch);

/**
 * [DELETE]
 */
advertRouter.delete('/:id', advertController.advertDelete);

module.exports = advertRouter;