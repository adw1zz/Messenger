module.exports = class ChatDto {
    id;
    users;
    messages;
    chatname;

    constructor(model) {
        this.id = model.id;
        this.chatname = model.chatname;
        this.messages = model.messages;
        this.users = model.users;
    }

}