const defaultState = {
    currentChatId: '',
    socket: null,
    chats: [],
}

export const wsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_SOCKET":
            return { ...state, socket: action.payload };
        case "SET_CHAT_ID":
            return { ...state, currentChatId: action.payload };
        case "PUSH_TO_СHATS":
            return { ...state, chats: action.payload };
        default:
            return state
    }
}