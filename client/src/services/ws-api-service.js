export default class WSService {

    static setSocket(url, currUserId, chat) {
        this.socket = new WebSocket(url);
        this.chatData = {
            currUsr: currUserId,
            chatId: chat.chatId,
            chatWith: chat.id
        }
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({...this.chatData, method: 'connection'}));
        }
    }

    static sendMessage(text, usr) {
        const msg = {
            from: usr.id,
            nickname: usr.nickname,
            text: text,
            datetime: new Date(),
            method: "send-message"
        }
        this.socket.send(JSON.stringify(msg));
    }

    static closeConnection() {
        
    }
}