const chatModel = require('../models/chat-model');
const messageModel = require('../models/msg-model');
const ChatDto = require('../dtos/chat-dto');
const aWss = require('../index').getWss();

class ChatService {

    currSessionMessages = [];

    async getChat(ws, msg) {
        ws.id = msg.currUsr.id;
        let chat = await chatModel.findOne({
            users: {$in: [
                msg.currUsr.id,
            ]}
        });
        if (!chat) {
            chat = await chatModel.create({users: [msg.currUsr.id, msg.chatWith.id], messages: []});
        }
        this.chatDto = new ChatDto(chat);
        //ws.send(JSON.stringify(this.chatDto));
    }

    broadcasting(message) {
        this.currSessionMessages.push(message);
        aWss.clients.forEach((client) => {
            if (this.chatDto.users.includes(client.id)) {
                client.send(JSON.stringify(message));
            }
        })
    }

}

module.exports = new ChatService();