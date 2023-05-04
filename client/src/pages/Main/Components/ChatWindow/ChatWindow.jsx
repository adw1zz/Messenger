import React from "react";
import "../../../../styles/chat-window.scss";
import Dialog from "../Dialog/Dialog";

const ChatWindow = () => {

    return (
        <div className="chat-window">
            <div className="chat-window-panel">

            </div>
            <div className="chat-window-dialog">
                <Dialog/>
            </div>
            <div className="chat-window-input">
                <input type="text" placeholder="Enter a message" />
            </div>
        </div>

    )
}

export default ChatWindow;