import React, {useContext, useEffect, useState} from "react";
import "../../../../styles/chats.scss";
import Chat from "../Chat/Chat";
import ApiService from "../../../../services/http-api-service";
import { useFetching } from "../../../../hooks/api-request";
import {AuthorizationContext} from '../../../../context/context';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "../../../../resused/Loader/Loader";

const Chats = () => {

    const [chats, setChats] = useState([]);
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
        }
    })

    useEffect(() => {
        if (toFetch === 1) {
            fetchChats();
            dispatch({type: 'NOT_FETCH_DATA'});
        }
    },[toFetch]);

    useEffect(() => {
        if (queve === 2) {
            fetchChats();
            dispatch({type: 'FETCH_QUEVE_RESET'});
        } 
    },[queve])

    return (
        <div className="chats-block">
            <div className="chats-input">
                <input type="text" maxLength={16} placeholder="Search chats"/>
            </div>
            <div className="chat-list">
                {isChatsFetching
                    ? <Loader/>
                    : chats?.map((chat) => {
                        return <Chat key={chat.id} chat={chat}/>
                    })
                }
            </div>
        </div>
    )
}

export default Chats;