const defaultState = {
    deletedChatId: '',
    currentChatName: '',
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
        case "SET_CURRENT_CHAT_NAME":
            return { ...state, currentChatName: action.payload };
        case "RESET_CHAT_ID":
            return { ...state, currentChatId: '' }
        case "PUSH_TO_СHATS":
            return { ...state, chats: [...state.chats, action.payload] };
        case "SET_DELETED_CHAT":
            return { ...state, deletedChatId: action.payload };
        default:
            return state
    }
}