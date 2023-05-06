import React, { useContext } from "react";
import "../../../../styles/chat.scss";
import DefaultAvatar from "../../../../assets/circle-user.png";
import Delete from "../../../../assets/trash.png";
import { useDispatch, useSelector } from "react-redux";
import WSService from "../../../../services/ws-api-service";
import { AuthorizationContext } from "../../../../context/context";

const Chat = ({ chat }) => {

    const dispatch = useDispatch();
    const usesChats = useSelector(state => state.chatData.chats);
    const currentUser = useContext(AuthorizationContext).userData;

    const onChatClick = (e) => {
        e.stopPropagation();
        const currChat = chat;
        const isChatsExists = usesChats.find(chat => chat.ChatId === currChat.id);
        if (usesChats.length === 0) {
            const socket = WSService.setSocket(currentUser.id, currChat);
            dispatch({ type: "SET_SOCKET", payload: socket });
        }
        if (!isChatsExists) {
            dispatch({ type: "SET_CHAT_ID", payload: currChat.id })
            dispatch({
                type: 'SET_СHAT', payload: usesChats.push({
                    currUser: currentUser,
                    chatId: currChat.id,
                    chatWith: currChat.user.id,
                })
            })
        }
    }

    return (
        <div className="chat" onClick={onChatClick}>
            <div>
                <img src={DefaultAvatar} />
            </div>
            <div>
                {chat.user.nickname}
            </div>
            <div>
                <img src={Delete} />
            </div>
        </div>
    )
}

export default Chat;