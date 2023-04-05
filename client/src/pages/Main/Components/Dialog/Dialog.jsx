import React, { useContext } from "react";
import cl from './Dialog.module.css';
import Message from '../Message/Message'; 
import { SessionContext } from "../../../../context/context";

const Dialog = () => {

    const msgArray = useContext(SessionContext).messages;

    return (
        <div className={cl.dialog_block}>
            {msgArray[0].from !== '' ? msgArray.map((message) => {
                return <Message message={message} key={message.datetime}/>
            }) : <></>}
        </div>
    )
}

export default Dialog;