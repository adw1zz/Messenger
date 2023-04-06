const chatModel = require('../models/chat-model');
const messageModel = require('../models/msg-model');
const ChatDto = require('../dtos/chat-dto');
const messageService = require('./message-service');
const aWss = require('../index').getWss();

class ChatService {

    currSessionMessages = [];

    async getChat(ws, msg) {
        ws.id = msg.currUsr.id;
        let chat = await chatModel.findOne({
            users: {
                $in: [
                    msg.currUsr.id,
                ]
            }
        });
        if (!chat) {
            chat = await chatModel.create({ users: [msg.currUsr.id, msg.chatWith.id], messages: [] });
        }
        this.chatDto = new ChatDto(chat);
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
        if (clientsCount === 1) {
            const createdMsgArray = await messageService.saveMessages(this.currSessionMessages);
            const newArray = this.chatDto.messages.concat(createdMsgArray);
            await chatModel.findByIdAndUpdate({ id: this.chatDto.id }, { $set: { messages: newArray } });
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
        const newChatsArray = chats.map((chat) => {
            return new ChatDto(chat);
        })
        console.log(newChatsArray);
        return newChatsArray;
    }

}

module.exports = new ChatService();