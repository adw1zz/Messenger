const Router = require('express').Router;
const chatController = require('../controllers/chat-controller');
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = new require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('nickname').isLength({min: 1, max: 8}),
    body('password').isLength({min: 8, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/user', authMiddleware, userController.getUserData);
router.post('/add_chat', authMiddleware, userController.addChat);
router.get('/chats', authMiddleware, userController.getChats);
router.post('/update_user', authMiddleware, userController.updateUser);

module.exports = router;