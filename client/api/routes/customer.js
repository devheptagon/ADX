const customerRouter = require('express').Router();
const customerController = require('../controllers/customer');

/**
 * [POST]
 */
customerRouter.post('/id', customerController.createID);

/**
 * [GET]
 */
customerRouter.get('/', customerController.customerGet);

/**
 * [GET]
 */
customerRouter.get('/:id', customerController.singleGet);

/**
 * [POST]
 */
customerRouter.post('/', customerController.customerPost);

/**
 * [UPDATE]
 */
customerRouter.patch('/:id', customerController.customerPatch);

/**
 * [DELETE]
 */
customerRouter.delete('/:id', customerController.customerDelete);

/**
 * [POST]
 */
customerRouter.post('/login', customerController.customerLogin);

module.exports = customerRouter;