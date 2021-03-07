const authRouter = require('express').Router();
const authController = require('../controllers/auth');

/**
 * [POST]
 */
authRouter.post('/login', authController.login);

/**
 * [POST]
 */
// authRouter.post('/register', authController.authPost);

module.exports = authRouter;