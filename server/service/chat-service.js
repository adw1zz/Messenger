const chatModel = require('../models/chat-model');
const ChatDto = require('../dtos/chat-dto');
const userModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');

class ChatService {

    async createChat(users) {
        const chat = await chatModel.create({chatname: '', users: users, messages: []});
        return chat;
    }

    async getChats(userId) {
        const chats = await chatModel.find({
            users: {
                $all: [
                    userId
                ]
            }
        });
        const chatDtos = chats.map((chat) => {
            const chatDto = new ChatDto(chat);
            return {
                id: chatDto.id,
                userIds: chatDto.users,
            }
        })
        const neededUsers = chatDtos.map((chat) => {
            if (chat.userIds[0] != userId) {
                return chat.userIds[0];
            } else {
                return chat.userIds[1];
            }
        })
        const users = await userModel.find({
            '_id': {$in: neededUsers}
        }); 
        const userDtos = users.map((user) => {
            const userDto = new UserDto(user);
            return {
                nickname: userDto.nickname,
                id: userDto.id,
            }
        })
        const result = [];
        for(let i=0; i<chatDtos.length; i++) {
            result.push({
                user: {...userDtos[i]},
                id: chatDtos[i].id
            })
        }
        return result;
    }

}

module.exports = new ChatService();