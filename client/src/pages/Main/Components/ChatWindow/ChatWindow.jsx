import React from "react";
import cl from './ChatWindow.module.css';
import TextInput from "../TextInput/TextInput";
import Dialog from '../Dialog/Dialog';

const ChatWindow = () => {
    return (
        <div className={cl.chat_window_block}>
           <Dialog/>
           <TextInput/>
        </div>
        
    )
}

export default ChatWindow;