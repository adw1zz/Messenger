import React from "react";
import cl from './Dialog.module.css';
import Message from '../Message/Message'; 

const Dialog = () => {
    return (
        <div className={cl.dialog_block}>
            <Message/>
            <Message/>
            <Message/>
        </div>
    )
}

export default Dialog;