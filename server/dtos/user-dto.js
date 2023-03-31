module.exports = class UserDto {
    email;
    id;
    isActivated;
    userTag;
    nickname;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.userTag = model.userTag;
        this.nickname = model.nickname;
        this.isActivated = model.isActivated;
    }
} 
