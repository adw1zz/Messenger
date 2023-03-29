import React from "react";
import cl from './Chat.module.css';

const Chat = () =>{
    return (
        <div className={cl.chat_block}>
            <div>
                icon
            </div>
            <div>
                nickname
            </div>
        </div>
    )
}

export default Chat;