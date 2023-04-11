const chatModel = require('../models/chat-model');
const messageService = require('./message-service');
const userService = require('./user-service');
const ChatDto = require('../dtos/chat-dto');
const aWss = require('../index').getWss();

class ChatService {

    currSessionMessages = [];

    async getChat(ws, msg) {
        ws.id = msg.currUsr;
        let chat = await chatModel.findById(msg.chatId);
        if (!chat) {
            const usrs = [msg.currUsr, msg.chatWith];
            chat = await chatModel.create({ users: usrs, chatname: '', messages: [] });
        }
        const chatDto = new ChatDto(chat);
        this.chatDto = chatDto;
        this.currSessionMessages = [];
        const messages = await messageService.getChatMessages(this.chatDto.messages);
        ws.send(JSON.stringify(messages));
    }

    broadcasting(message) {
        this.currSessionMessages.push(message);
        aWss.clients.forEach((client) => {
            if (this.chatDto.users.includes(client.id)) {
                client.send(JSON.stringify(message));
            }
        })
    }

    async closeChat() {
        let clientsCount = 0;
        aWss.clients.forEach((client) => {
            if (this.chatDto.users.includes(client.id)) {
                clientsCount++;
            }
        })
        if (clientsCount === 0) {
            const createdMsgArray = await messageService.saveMessages(this.currSessionMessages);
            const newArray = this.chatDto.messages.concat(createdMsgArray);
            const chat = await chatModel.findById(this.chatDto.id);
            chat.messages = newArray;
            await chat.save();
            this.currSessionMessages = [];
            this.chatDto = {};
        }
    }

    async getUserChats(userId) {
        const chats = await chatModel.find({
            users:
            {
                $all: [
                    userId
                ]
            }
        })
        const chatsUsers = chats.map((chat) => {
            const chatDto = new ChatDto(chat);
            return {
                chatId: chatDto.id,
                users: chatDto.users
            }
        })
        const neededUsers = chatsUsers.map((chat) => {
            if (chat.users[0] != userId) {
                return chat.users[0];
            } else {
                return chat.users[1];
            }
        })
        const foundChats = await userService.getUsers(neededUsers);
        const result = [];
        for (let i = 0; i < foundChats.length; i++) {
            result.push({
                ...foundChats[i],
                chatId: chatsUsers[i].chatId,
            })
        }
        return result;
    }

}

module.exports = new ChatService();