module.exports = class OptionsDto {
    id;
    user;
    avatar;
    chatBackground;
    theme;

    constructor(model) {
        this.id = model.id;
        this.user = model.user;
        this.avatar = model.avatar;
        this.chatBackground = model.chatBackground;
        this.theme = model.theme;
    }
}