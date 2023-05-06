import React, { useContext } from "react";
import DefaultAvatar from "../../../../assets/circle-user.png";
import "../../../../styles/message.scss";
import { AuthorizationContext } from "../../../../context/context";

const Message = ({message}) => {

    const userData = useContext(AuthorizationContext).userData;

    return (
        <div className="message-block">
            <div className={userData.id === message.from ? "message-to" : "message-from"}>
                <div className="message-text">
                    <span>{message.text}</span>
                </div>
                <div>
                    {}
                </div>
            </div>
        </div>
    )
}

export default Message;