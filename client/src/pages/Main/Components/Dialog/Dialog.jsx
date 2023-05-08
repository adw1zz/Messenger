import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "../../../../styles/dialog.scss";
import { useDispatch, useSelector } from "react-redux";

const Dialog = () => {

    const socket = useSelector(state => state.chatData.socket);
    const isNewChatOpen = useSelector(state => state.chatData.currentChatId);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState({});

    const messageHandle = (event) => {
        const response = JSON.parse(event.data);
        switch (response.method) {
            case 'connection': setMessages(response.data.messages); break;
            case 'get-messages': setMessages(response.data.messages); break;
            case 'send-message': setNewMsg(response.data.message); break;
            case 'delete-chat': {
                setMessages([]);
                dispatch({ type: "SET_DELETED_CHAT", payload: response.data.chatId });
                dispatch({ type: "RESET_CHAT_ID" })
                break;
            }

        }
    }

    useEffect(() => {
        if (Object.keys(newMsg).length !== 0) {
            const prevArray = [...messages];
            prevArray.push({ ...newMsg });
            setMessages(prevArray);
        }
    }, [newMsg])

    useEffect(() => {
        if (isNewChatOpen) {
            setMessages([]);
            socket.onmessage = messageHandle;
        }
    }, [isNewChatOpen])

    useEffect(()=> {
        const msgArrContainer = document.getElementById('dialog_id');
        msgArrContainer.scrollTop = msgArrContainer.scrollHeight;
        if (messages.length < 5) {
            console.log('asd');
            msgArrContainer.style.justifyContent = 'flex-end';
        } else {
            msgArrContainer.style.justifyContent = null;
        }   
    },[messages])

    return (
        <div className="dialog" id='dialog_id'>
            {messages?.map((message) => {
                return <Message key={message.datetime} message={message} />
            })}
        </div>
    )
}

export default Dialog;