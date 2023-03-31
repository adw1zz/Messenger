const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = new require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('nickname').isLength({min: 1, max: 16}),
    body('password').isLength({min: 8, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/searchuser', authMiddleware, userController.searchUser);
router.get('/validate', authMiddleware);

module.exports = router;