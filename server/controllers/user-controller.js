const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const chatService = require('../service/chat-service');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const { email, nickname, password } = req.body;
            await userService.registration(email, nickname, password);
            return res.json({ message: 'Success' });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUserData(req, res, next) {
        try {
            const { id } = req.user;
            const userData = await userService.getUserData(id);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async addChat(req, res, next) {
        try {
            const { id } = req.user;
            const { userTag } = req.body;
            await userService.addChat(id, userTag);
            return res.json({ message: 'Success' })
        } catch (e) {
            next(e);
        }
    }

    async getChats(req, res, next) {
        try {
            const { id } = req.user;
            const chats = await chatService.getChats(id);
            return res.json({ chats: chats })
        } catch (e) {
            next(e);
        }
    }

    async updateUserOptions(req, res, next) {
        try {
            const { background, avatar } = req.files;
            const { nickname } = req.fields;
            const userId = req.user.id;
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();