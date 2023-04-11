import cl from './Chats.module.css';
import Chat from "../Chat/Chat";
import { useContext, useEffect, useState } from 'react';
import { useFetching } from '../../../../hooks/api-request';
import ApiService from '../../../../services/http-api-service';
import { AuthorizationContext, SessionContext } from '../../../../context/context';

const Chats = ({ usersToSearch }) => {
    const redir = useContext(AuthorizationContext).nav;
    const [foundUser, setFoundUser] = useState({});
    const [foundChat, setFoundChat] = useState({});
    const [userChats, setUserChats] = useState([]);
    const currUser = useContext(AuthorizationContext).userData;
    const searchValue = useContext(SessionContext).isSearchClicked;

    const [searchUsers, isSearching] = useFetching(async (toSearch) => {
        const response = await ApiService.searchUser(toSearch);
        if (response.status === 401) {
            redir('/login')
        } else {
            const data = await response.json();
            console.log(data);
            setFoundUser(data.foundUser);
        }
    })

    const [fetchChats, isFetching] = useFetching(async (userId) => {
        const response = await ApiService.getUserChats(userId);
        setUserChats(response);
    })

    const syncSearchUser = (toSearch) => {
        const neededUser = userChats.find(user => user === toSearch);
        setFoundChat(neededUser);
    }

    useEffect(() => {
        if (usersToSearch[0] === '@') {
            searchUsers(usersToSearch)
        } else {
            syncSearchUser(usersToSearch)
        }
    }, [usersToSearch])

    useEffect(() => {
        fetchChats(currUser.id);
    }, [])

    return (
        <>{searchValue
            ? 
            <div className={cl.chats_block}>
               {isSearching
                    ? 'Searching...'
                    : foundUser.nickname ? <Chat chat={foundUser} key={foundUser.id}/> : <></>
               }
            </div>
            : <div className={cl.chats_block}>
                {isFetching
                    ? 'Loading...'
                    : userChats.length ? userChats.map((chat) => {
                        return <Chat chat={chat} key={chat.id} />
                    }) : <></>

                }
            </div>
        }
        </>
    )
}

export default Chats;