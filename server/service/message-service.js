const messageModel = require('../models/msg-model');
const MsgDto = require('../dtos/msg-dto');

class MessageService {

    async saveMessages(messages) {
        const createdMsgArray = [];
        messages.forEach(async (message) => {
            const msg = await messageModel.create({...message})
            createdMsgArray.push(new MsgDto(msg).id);
        });
        return createdMsgArray;
    }

}

module.exports = new MessageService();