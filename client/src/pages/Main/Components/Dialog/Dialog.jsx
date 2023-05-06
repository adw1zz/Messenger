import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "../../../../styles/dialog.scss";
import { useSelector } from "react-redux";

const Dialog = () => {

    const socket = useSelector(state => state.chatData.socket);
    const isNewChatOpen = useSelector(state => state.chatData.currentChatId);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState({});

    const messageHandle = (event) => {
        const response = JSON.parse(event.data);
        if (response.method === 'connection' || response.method === 'get-messages') {
            setMessages(response.data.messages);
        } else if (response.method === 'send-message') {
            setNewMsg(response.data.message);
        }
    }

    useEffect(() => {
        if (Object.keys(newMsg).length !== 0) {
            const prevArray = messages.map((message) => { return { ...message } });
            prevArray.push({ ...newMsg });
            setMessages(prevArray);
        }
    }, [newMsg])

    useEffect(() => {
        if (isNewChatOpen) {
            socket.onmessage = messageHandle;
        }
    }, [isNewChatOpen])

    return (
        <div className="dialog">
            {messages?.reverse().map((message) => {
                return <Message key={message.datetime} message={message} />
            })}
        </div>
    )
}

export default Dialog;