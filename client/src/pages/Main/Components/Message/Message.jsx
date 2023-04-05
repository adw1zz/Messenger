import React, {useContext} from "react";
import cl from './Message.module.css';
import { AuthorizationContext } from "../../../../context/context";

const Message = ({message}) => {
    const currUser = useContext(AuthorizationContext).userData;
    return (
        <div className={cl.message_block}>
                <div className={currUser.id === message.from ? cl.to : cl.from}>
                   {message.text}
                </div>
        </div>
    )
}

export default Message;