const chatModel = require('../models/chat-model');
const messageService = require('../service/message-service');
const aWss = require('../index').getWss();
const userModel = require('../models/user-model');

class WSService {

    chats = [];

    async connetion(ws, data) {
        const isChatInRAM = this.chats.find(chat => chat.id === data.chatId);
        if (!isChatInRAM) {
            ws.id = data.currentUser;
            const chat = await chatModel.findById(data.chatId);
            const messages = await messageService.getChatMessages(chat.messages);
            this.chats.push({ id: data.chatId, users: [data.currentUser], messages: messages || [] });
            ws.send(JSON.stringify({ method: 'connection', data: { messages: messages } }));
        } else {
            ws.id = data.currentUser;
            const chatIndex = this.chats.findIndex(chat => chat.id === data.chatId);
            const messages = this.chats[chatIndex].messages || [];
            this.chats[chatIndex].users.push(data.currentUser);
            ws.send(JSON.stringify({ method: 'connection', data: { messages: messages } }));
        }

    }

    async getMessages(ws, data) {
        const chatIndex = this.chats.findIndex(chat => chat.id === data.chatId);
        const messages = this.chats[chatIndex].messages || [];
        ws.send(JSON.stringify({ method: 'get-messages', data: { messages: messages } }));
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


    async closeWs(ws) {
        const chatsToClose = [];
        this.chats.forEach((chat) => {
            if (chat.users.includes(ws.id) && chat.users.length === 1) {
                chatsToClose.push({
                    ...chat
                })
            } else {
                const closeSocketUserId = chat.users.findIndex(user => user === ws.id);
                chat.users.splice(closeSocketUserId, 1);
            }
        })
        chatsToClose.forEach(async (chatToClose) => {
            const chatToCloseIndex = this.chats.findIndex(chat => chat.id === chatToClose.id);
            this.chats.splice(chatToCloseIndex, 1);
            const messagesIds = await messageService.saveMessages(chatToClose.messages);
            const currentChat = await chatModel.findById(chatToClose.id);
            currentChat.messages = messagesIds;
            await currentChat.save();
        })
    }

    async deleteChat(data) {
        const chatToDeleteIndex = this.chats.findIndex(chat => chat.id === data.chatId);
        const chatInRAMUsers = this.chats[chatToDeleteIndex].users;
        this.chats.splice(chatToDeleteIndex, 1);
        const chat = await chatModel.findById(data.chatId);
        await messageService.deleteMessages(chat.messages);
        await chatModel.findByIdAndDelete(data.chatId);
        aWss.clients.forEach((client) => {
            if (chatInRAMUsers.includes(client.id)) {
                client.send(JSON.stringify({
                    method: 'delete-chat',
                    data: {
                        chatId: data.chatId
                    }
                }))
            }
        })
    }

}

module.exports = new WSService();