module.exports = class ChatDto {
    id;
    users;
    name;
    messages;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.users = model.users;
        this.messages = model.messages;
    }

}