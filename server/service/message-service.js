const messageModel = require('../models/msg-model');
const MsgDto = require('../dtos/msg-dto');

class MessageService {

    async saveMessages(messages) {
        const msgArray = await messageModel.create(messages);
        const msgArrayIds = msgArray.map((msg) => {
            return new MsgDto(msg).id;
        }) 
        return msgArrayIds;
    }

    async getChatMessages(messagesIdArray) {
        const msgArray = await messageModel.find({
            '_id': {
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