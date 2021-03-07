const brokerRouter = require('express').Router();
const brokerController = require('../controllers/broker');

/**
 * [POST]
 */
brokerRouter.post('/', brokerController.brokerPost);

/**
 * [POST]
 */
brokerRouter.post('/login', brokerController.brokerLogin);

module.exports = brokerRouter;