const wsService = require('../service/ws-service');

class ChatController {

    chating(ws, req) {
        ws.on('message', async (msg) => {
            msg = JSON.parse(msg);
            switch (msg.method) {
                case 'connection': await wsService.connetion(ws, msg.data); break;
                case 'send-message': wsService.broadcast(msg.data); break;
            }
        })
        ws.on('close', async (msg) => {
            console.log('close');
        })
    }

}

module.exports = new ChatController();