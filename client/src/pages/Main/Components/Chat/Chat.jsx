import React, { useContext, useEffect, useState } from "react";
import cl from './Chat.module.css';
import { AuthorizationContext, SessionContext } from "../../../../context/context";
import WSService from "../../../../services/ws-api-service";

const Chat = ({ user }) => {

    const usr = useContext(AuthorizationContext).userData;
    const setMsgArray = useContext(SessionContext).setMessages;
    const msgArray = useContext(SessionContext).messages;

    const [resp, setResp] = useState({ from: '', text: '', datetime: '' });

    useEffect(() => {
        if (resp.from !== '') {
            const newMsgArr = JSON.parse(JSON.stringify(msgArray));
            if (newMsgArr[0].from === '') {
                newMsgArr.shift();
            }
            newMsgArr.push(resp);
            console.log(newMsgArr);
            setMsgArray(newMsgArr);
        }
    }, [resp])

    const chatingHandle = (e) => {
        const response = JSON.parse(e.data);
        setResp(response);
    }

    const onClickHandle = () => {
        WSService.setSocket('ws://localhost:5000/api/chat', usr, user);
        WSService.socket.onmessage = chatingHandle;
    }

    return (
        <div className={cl.chat_block} onClick={onClickHandle}>
            <div>
                icon
            </div>
            <div>
                {user.nickname}
            </div>
        </div>
    )
}

export default Chat;