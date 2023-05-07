export default class WSService {

    static #wsURL = 'ws:/localhost:5000/api/chat';

    static setSocket(currentUserId, chat) {
        const socket = new WebSocket(this.#wsURL);
        const chatData = {
            currentUser: currentUserId,
            chatId: chat.id,
            chatWith: chat.user.id,
        }
        socket.onopen = () => {
            socket.send(JSON.stringify({ data: { ...chatData }, method: 'connection' }));
        }
        return socket;
    }

    static connect(currentUserId, chat, socket) {
        const chatData = {
            currentUser: currentUserId,
            chatId: chat.id,
            chatWith: chat.user.id,
        }
        socket.send(JSON.stringify({ data: { ...chatData }, method: 'connection' }));
    }

    static getMessages(currentUserId, chat, socket) {
        const chatData = {
            currentUser: currentUserId,
            chatId: chat.id,
            chatWith: chat.user.id,
        }
        socket.send(JSON.stringify({ data: { ...chatData }, method: 'get-messages' }));
    }

    static sendMessage(text, currentChatId, usr, socket) {
        const msg = {
            chatId: currentChatId,
            from: usr.id,
            text: text,
            datetime: new Date(),
        }
        socket.send(JSON.stringify({ data: { ...msg }, method: 'send-message' }));
    }

    static deleteChat(socket, chat) {
        const chatData = {
            chatId: chat.id
        }
        socket.send(JSON.stringify({ data: { ...chatData }, method: 'delete-chat' }))
    }

    static updateNickname(socket, userId, chats, nickname) {
        const data = {
            currentUser: userId,
            chats: chats,
            nickname: nickname,
        }
        socket.send(JSON.stringify({ data: { ...data }, method: 'update-nickname' }));
    }

}