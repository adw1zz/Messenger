const {Schema, model} = require('mongoose');

const ChatSchema = new Schema({
    chatname: {type: String, required: false},
    users: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    messages: [
        {type: Schema.Types.ObjectId, ref: 'Messsage'}
    ]
})

module.exports = model('Chat', ChatSchema);