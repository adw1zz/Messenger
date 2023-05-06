const chatModel = require('../models/chat-model');
const messageService = require('../service/message-service');
const aWss = require('../index').getWss();

class WSService {

    chats = [];

    async connetion(ws, data) {
        const isChatInRAM = this.chats.find(chat => chat.id === data.chatId);
        if (!isChatInRAM) {
            ws.id = data.currentUser;
            const chat = await chatModel.findById(data.chatId);
            const messages = await messageService.getChatMessages(chat.messages);
            this.chats.push({ id: data.chatId, users: [data.currentUser, data.chatWith], messages: messages || [] });
            ws.send(JSON.stringify({ method: 'connection', data: { messages: messages } }));
        } else {
            ws.id = data.currentUser;
            const chatIndex = this.chats.findIndex(chat => chat.id === data.chatId);
            const messages = this.chats[chatIndex].messages || [];
            ws.send(JSON.stringify({ method: 'get-messages', data: { messages: messages } }));
        }

    }

    broadcast(data) {
        const chatIndex = this.chats.findIndex(chat => chat.id === data.chatId);
        this.chats[chatIndex].messages.push({
            from: data.from,
            text: data.text,
            datetime: data.datetime
        });
        aWss.clients.forEach((client) => {
            if (this.chats[chatIndex].users.includes(client.id)) {
                client.send(JSON.stringify({
                    method: 'send-message',
                    data: {
                        message: {
                            from: data.from,
                            text: data.text,
                            datetime: data.datetime
                        }
                    }
                }))
            }
        })
    }

}

module.exports = new WSService();