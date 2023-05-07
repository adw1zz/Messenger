import React, { useContext, useEffect, useState } from "react";
import "../../../../styles/chats.scss";
import Chat from "../Chat/Chat";
import ApiService from "../../../../services/http-api-service";
import { useFetching } from "../../../../hooks/api-request";
import { AuthorizationContext } from '../../../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../../../resused/Loader/Loader";

const Chats = () => {

    const [chats, setChats] = useState([]);
    const [prevChats, setPrevChats] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const currentChatId = useSelector(state => state.chatData.currentChatId);
    const deletedChatId = useSelector(state => state.chatData.deletedChatId);
    const redir = useContext(AuthorizationContext).nav;
    const queve = useSelector(state => state.userData.fetchQueve);
    const toFetch = useSelector(state => state.userData.toFetch);
    const dispatch = useDispatch();
    const [fetchChats, isChatsFetching] = useFetching(async () => {
        const response = await ApiService.getChats();
        if (!response) {
            redir('/login')
        } else {
            setChats(response.chats);
            setPrevChats(response.chats);
        }
    })

    useEffect(() => {
        if (inputValue) {
            if (inputValue) {
                const found = chats.filter((chat) => {
                    if (chat.user.nickname.includes(inputValue)) {
                        return { ...chat }
                    }
                })
                if (found.length != 0) {
                    setChats(found);
                }else {
                    const prevchats = [...prevChats];
                    setChats(prevchats);
                }
            } 
        }
    }, [inputValue])

    const searchInputHandle = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        if (!currentChatId && deletedChatId) {
            const newChats = [...chats];
            const indexToDelete = newChats.findIndex(chat => chat.id === deletedChatId);
            newChats.splice(indexToDelete, 1);
            setChats(newChats);
            setPrevChats(newChats);
        }
    }, [deletedChatId])

    useEffect(() => {
        if (toFetch === 1) {
            fetchChats();
            dispatch({ type: 'NOT_FETCH_DATA' });
        }
    }, [toFetch]);

    useEffect(() => {
        if (queve === 2) {
            fetchChats();
            dispatch({ type: 'FETCH_QUEVE_RESET' });
        }
    }, [queve])

    return (
        <div className="chats-block">
            <div className="chats-input">
                <input type="text" maxLength={8} placeholder="Search chats"
                    onChange={searchInputHandle}
                />
            </div>
            <div className="chat-list">
                {isChatsFetching
                    ? <Loader />
                    : chats?.map((chat) => {
                        return <Chat key={chat.id} chat={chat} />
                    })
                }
            </div>
        </div>
    )
}

export default Chats;