module.exports = class ChatDto {
    id;
    users;
    chatname;
    messages;

    constructor(model) {
        this.id = model.id;
        this.chatname = model.chatname;
        this.users = model.users;
        this.messages = model.messages;
    }

}