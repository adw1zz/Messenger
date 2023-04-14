const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const OptionsDto = require('../dtos/options-dto');
const userOptionsModel = require('../models/user-options-model');
const FileService = require('./file-service');

class UserService {
    async registration(email, nickname, password) {
        const isMailExists = await userModel.findOne({ email });
        if (isMailExists) {
            throw ApiError.BadRequest(`User with this email <${email}> already exists`);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();

        const user = await userModel.create({ email, nickname, userTag: `@${(+new Date).toString(16)}`, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        await FileService.makeDirectory(userDto.id);
        const options = await userOptionsModel.create({user: userDto.id});
        const userOptions = new OptionsDto(options);

        return {
            ...tokens,
            userOptions: userOptions,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Incorrect activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`User with email <${email}> not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async validate(userData) {
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        return { user: userDto }
    }

    async searchUser(userTag) {
        const user = await userModel.findOne({ userTag: userTag });
        if (!user) {
            throw ApiError.BadRequest(`User with userTag <${userTag}> not found`);
        }
        const userDto = new UserDto(user);
        return { foundUser: {
            id: userDto.id,
            nickname: userDto.nickname,
        } }
    }

    async getUsers(userIdArray) {
        const users = await userModel.find({
            '_id': {
                $in: userIdArray
            }
        })
        const foundUsers = users.map((user) => {
            const userDto = new UserDto(user);
            return {
                id: userDto.id,
                nickname: userDto.nickname
            }
        })
        return foundUsers;
    }

}

module.exports = new UserService();