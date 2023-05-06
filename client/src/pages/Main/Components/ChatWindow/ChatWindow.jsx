import React, { useContext, useEffect, useState } from "react";
import "../../../../styles/chat-window.scss";
import Dialog from "../Dialog/Dialog";
import { useSelector } from "react-redux";
import WSService from "../../../../services/ws-api-service";
import { AuthorizationContext } from "../../../../context/context";

const ChatWindow = () => {

    const socket = useSelector(state => state.chatData.socket);
    const currentUser = useContext(AuthorizationContext).userData;
    const currentChatId = useSelector(state => state.chatData.currentChatId);

    const inputHandle = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value) {
                WSService.sendMessage(e.target.value, currentChatId, currentUser, socket);
                e.target.value = '';
            }
        }
    }

    const onClickHandle = (e) => {
        e.target.addEventListener('keydown', inputHandle)
    }

    return (
        <div className="chat-window">
            <div className="chat-window-panel">

            </div>
            <div className="chat-window-dialog">
                <Dialog />
            </div>
            <div className="chat-window-input">
                <input type="text" placeholder="Enter a message"
                    onClick={onClickHandle}
                    name="textInput"
                />
            </div>
        </div>

    )
}

export default ChatWindow;