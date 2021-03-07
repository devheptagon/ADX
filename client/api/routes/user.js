const userRouter = require('express').Router();
const userController = require('../controllers/user');
const authCheck = require('../middleware/auth');

/**
 * [POST]
 */
userRouter.post('/id', userController.createID);

/**
 * [GET]
 */
userRouter.get('/', userController.userGet);

/**
 * [GET]
 */
userRouter.get('/:id', userController.singleGet);

/**
 * [POST]
 */
userRouter.post('/', userController.userPost);

/**
 * [UPDATE]
 */
userRouter.patch('/:id', authCheck, userController.userPatch);

/**
 * [DELETE]
 */
userRouter.delete('/:id', authCheck, userController.userDelete);

/**
 * [POST]
 */
userRouter.post('/login', userController.userLogin);

module.exports = userRouter;