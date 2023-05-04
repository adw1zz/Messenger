import React from "react";
import "../../../../styles/chat.scss";
import DefaultAvatar from "../../../../assets/circle-user.png";
import Delete from "../../../../assets/trash.png";

const Chat = () => {
    return (
        <div className="chat">
            <div>
                <img src={DefaultAvatar} />
            </div>
            <div>
                nickname
            </div>
            <div>
                <img src={Delete}/>
            </div>
        </div>
    )
}

export default Chat;