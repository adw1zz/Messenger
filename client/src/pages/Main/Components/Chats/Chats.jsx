import cl from './Chats.module.css';
import Chat from "../Chat/Chat";
import { SessionContext } from '../../../../context/context';
import { useContext, useState } from 'react';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const foundUsers = useContext(SessionContext).foundUsers;
    
    return (
        <div className={cl.chats_block}>
           {foundUsers
                ? foundUsers.map((user) => {
                    return <Chat nickname={user.nickname}/>
                })
                : chats.map((chat) => {
                    return '';
                })
           }
        </div>
    )
}

export default Chats;