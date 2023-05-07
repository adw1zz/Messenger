import React, { useContext, useEffect, useState } from "react";
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
    const currentChatId = useSelector(state => state.chatData.currentChatid);
    const socket = useSelector(state => state.chatData.socket);
    const [ischatSelected, setchatSleceted] = useState(false);

    const onChatClick = (e) => {
        e.stopPropagation();
        const currChat = chat;
        setchatSleceted(true);
        const isChatExists = usesChats.includes(currChat.id);
        if (usesChats.length === 0) {
            const createdSocket = WSService.setSocket(currentUser.id, currChat);
            dispatch({ type: "SET_SOCKET", payload: createdSocket });
            dispatch({ type: "SET_CHAT_ID", payload: currChat.id });
            dispatch({type: 'SET_CURRENT_CHAT_NAME', payload: currChat.user.nickname});
            dispatch({
                type: 'PUSH_TO_СHATS',
                payload: currChat.id
            })
        }
        if (isChatExists) {
            dispatch({ type: "SET_CHAT_ID", payload: currChat.id });
            dispatch({type: 'SET_CURRENT_CHAT_NAME', payload: currChat.user.nickname});
            WSService.getMessages(currentUser.id, currChat, socket)
        } else if (!isChatExists && socket) {
            WSService.connect(currentUser.id, currChat, socket)
            dispatch({ type: "SET_CHAT_ID", payload: currChat.id });
            dispatch({type: 'SET_CURRENT_CHAT_NAME', payload: currChat.user.nickname});
            dispatch({
                type: 'PUSH_TO_СHATS',
                payload: currChat.id
            })
        }
    }

    useEffect(()=> {
        if (currentChatId != chat.id) {
            setchatSleceted(false);
        }
    },[currentChatId])

    const onDeleteClick = (e) => {
        e.stopPropagation();
        if (!socket) {
            alert('Please open connection by selecting some chat')
        } else {
            WSService.deleteChat(socket, chat);
        }
    }

    return (
        <div className="chat" onClick={onChatClick} style={{boxShadow: ischatSelected ? '0 0 5px 2px rgba(52, 179, 241, 0.5)' : 'none'}}>
            <div>
                <img src={DefaultAvatar} />
            </div>
            <div>
                {chat.user.nickname}
            </div>
            <div>
                <img src={Delete} onClick={onDeleteClick} />
            </div>
        </div>
    )
}

export default Chat;