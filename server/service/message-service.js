const messageModel = require('../models/msg-model');
const MsgDto = require('../dtos/msg-dto');

class MessageService {

    async saveMessages(messages, chatId) {
        const msgArray = [];
        messages.forEach(message => {
            const newMsg = messageModel.create({ ...message, chatId });
            msgArray.push(new MsgDto(newMsg).id);
        });
        return msgArray;
    }

    async getChatMessages(messagesIdArray) {
        const msgArray = await messageModel.find({
            id: {
                $in: messagesIdArray
            }
        });
        const msgDtosArray = msgArray.map((message) => {
            return new MsgDto(message);
        })
        return msgDtosArray;
    }

}

module.exports = new MessageService();