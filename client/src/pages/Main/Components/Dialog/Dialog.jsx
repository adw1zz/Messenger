import React, { useContext, useEffect, useRef } from "react";
import cl from './Dialog.module.css';
import Message from '../Message/Message';
import { SessionContext } from "../../../../context/context";

const Dialog = () => {

    const msgArray = useContext(SessionContext).messages;
    const listBlock = useRef(); 

    useEffect(() => {
        listBlock.current.scrollTop = listBlock.current.scrollHeight;
    },[msgArray])

    return (
        <>{msgArray.length
            ? <div className={cl.dialog_block} ref={listBlock}>
                {msgArray[0].from !== '' ? msgArray.map((message) => {
                    return <Message message={message} key={message.datetime} />
                }) : <></>}
            </div>
            : <div className={cl.dialog_block} ref={listBlock}>
            </div>
        }
        </>

    )
}

export default Dialog;