const messageRouter = require('express').Router();
const messageController = require('../controllers/message');

/**
 * [POST]
 */
messageRouter.post('/id', messageController.createID);

/**
 * [GET]
 */
messageRouter.get('/', messageController.messageGet);

/**
 * [GET]
 */
messageRouter.get('/:id', messageController.singleGet);

/**
 * [POST]
 */
messageRouter.post('/', messageController.messagePost);

/**
 * [UPDATE]
 */
messageRouter.patch('/:id', messageController.messagePatch);

/**
 * [DELETE]
 */
messageRouter.delete('/:id', messageController.messageDelete);

module.exports = messageRouter;