const {Schema, model} = require('mongoose');

const MessageModel = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    text: {type: String},
    datetime: {type: Date}, 
})

module.exports = model('Message', MessageModel);