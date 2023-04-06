module.exports = class MsgDto {
    id;
    from;
    text;
    datetime;

    constructor(model) {
        this.id = model.id;
        this.from =  model.from;
        this.text = model.text;
        this.datetime = model.datetime;
    }
}