const {Schema, model} = require('mongoose');

const UserOptionsSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    avatar: {type: String, unique: false, required: false},
    chatBackground: {type: String, unique: false, required: false},
    theme: {type: Boolean, required: false},
})

module.exports = model('UserOptions', UserOptionsSchema)