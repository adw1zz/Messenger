const chatService = require('../service/chat-service');

class ChatController {

    chating(ws, req) {
        ws.on('message', async (msg) => {
            msg = JSON.parse(msg);
            switch (msg.method) {
                case 'connection': await chatService.getChat(ws, msg); break;
                case "send-message": chatService.broadcasting(msg); break;
            }
        })
        ws.on('close', async (msg) => {
            await chatService.closeChat();
        })
    }

    async getChats(req, res, next) {
        try {
            const userId = req.query.userId;
            const chats = await chatService.getUserChats(userId);
            return res.json(chats);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ChatController();