import cl from './Chats.module.css';
import Chat from "../Chat/Chat";
import { SessionContext } from '../../../../context/context';
import { useContext, useState } from 'react';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const foundUser = useContext(SessionContext).foundUser;
    
    return (
        <div className={cl.chats_block}>
           {foundUser
                ? <Chat nickname={foundUser}/>
                : chats.map((chat) => {
                    return '';
                })
           }
        </div>
    )
}

export default Chats;