const wsService = require('../service/ws-service');

class ChatController {

    chating(ws, req) {
        ws.on('message', async (msg) => {
            msg = JSON.parse(msg);
            switch (msg.method) {
                case 'connection': await wsService.connetion(ws, msg.data); break;
                case 'send-message': wsService.broadcast(msg.data); break;
                case 'get-messages': wsService.getMessages(ws, msg.data); break;
                case 'delete-chat': wsService.deleteChat(msg.data); break;
            }
        })
        ws.on('close', async (msg) => {
            await wsService.closeWs(ws);
        })
        ws.on('error', (err) => {
            console.log(err);
        })
    }

}

module.exports = new ChatController();