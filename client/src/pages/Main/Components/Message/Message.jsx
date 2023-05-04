import React from "react";
import DefaultAvatar from "../../../../assets/circle-user.png";
import "../../../../styles/message.scss";

const Message = () => {
    return (
        <div className="message-block">
            <div className="message">
                <div>
                    <img src={DefaultAvatar} />
                </div>
                <div>
                    <span>Message Message</span>
                </div>
                <div>
                    12:23
                </div>
            </div>
        </div>
    )
}

export default Message;