import React from "react";
import "../../../../styles/chats.scss";
import Chat from "../Chat/Chat";

const Chats = () => {

    return (
        <div className="chats-block">
            <div className="chats-input">
                <input type="text" maxLength={16} placeholder="Search chats"/>
            </div>
            <div className="chat-list">
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
            </div>
        </div>
    )
}

export default Chats;