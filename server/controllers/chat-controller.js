const chatService = require('../service/chat-service');

class ChatController {

    chating(ws, req) {
        ws.on('message', async (msg) => {
            msg = JSON.parse(msg);
            switch(msg.method) {
                case 'connection':  await chatService.getChat(ws, msg); break;
                case "send-message": chatService.broadcasting(msg); break;
            }
        })
    }


}

module.exports = new ChatController();