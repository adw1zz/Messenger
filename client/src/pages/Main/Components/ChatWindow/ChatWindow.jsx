import React, { useContext, useEffect, useState } from "react";
import "../../../../styles/chat-window.scss";
import Dialog from "../Dialog/Dialog";
import { useSelector } from "react-redux";
import WSService from "../../../../services/ws-api-service";
import { AuthorizationContext } from "../../../../context/context";

const ChatWindow = () => {

    const socket = useSelector(state => state.chatData.socket);
    const currentUser = useContext(AuthorizationContext).userData;
    const currentChatId = useSelector(state => state.chatData.currentChatId);
    const currentChatName = useSelector(state => state.chatData.currentChatName);
    const [inputValue, setInputValue] = useState('');
    const [chatSelected, setIsChatSelected] = useState(false);

    const inputHandle = (e) => {
        if (e.key === 'Enter' && e.key != 'Shift') {
            if (e.target.value) {
                setInputValue(e.target.value);
                e.target.value = '';
            }
        }
    }

    const onClickHandle = (e) => {
        e.target.addEventListener('keydown', inputHandle)
    }

    useEffect(()=> {
        if (currentChatId && currentChatName) {
            setIsChatSelected(true)
        } else {
            setIsChatSelected(false);
        }
    },[currentChatId, currentChatName])    

    useEffect(() => {
        if (socket) {
            WSService.sendMessage(inputValue, currentChatId, currentUser, socket)
        }
    }, [inputValue])

    return (
        <div className="chat-window">
            <div className="chat-window-panel" style={{boxShadow: chatSelected
                ? '0 0 5px 2px rgba(52, 179, 241, 0.5)'
                : 'none'
            }}>
                <div>
                    {chatSelected ? `Chat with: ${currentChatName}` : ''}
                </div>
            </div>
            <div className="chat-window-dialog">
                <Dialog />
            </div>
            <div className="chat-window-input">
                {socket && currentChatId
                    ? <textarea type="text" placeholder="Type text and press Enter to send"
                        onClick={onClickHandle} rows={3} cols={50} maxLength={200}
                        name="textInput"
                    />
                    : <></>
                }
            </div>
        </div>

    )
}

export default ChatWindow;