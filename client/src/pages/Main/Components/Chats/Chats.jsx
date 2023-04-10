import cl from './Chats.module.css';
import Chat from "../Chat/Chat";
import { useContext, useEffect, useState } from 'react';
import { useFetching } from '../../../../hooks/api-request';
import ApiService from '../../../../services/http-api-service';
import { AuthorizationContext, SessionContext } from '../../../../context/context';
import AuthService from '../../../../services/auth-service';

const Chats = ({ usersToSearch }) => {
    const redir = useContext(AuthorizationContext).nav;
    const [foundUsers, setFoundUsers] = useState([]);
    const [userChats, setUserChats ] = useState([]);
    const currUser = useContext(AuthorizationContext).userData;
    const searchValue = useContext(SessionContext).isSearchClicked;

    const [searchUsers, isSearching] = useFetching(async (toSearch) => {
        const response = await ApiService.searchUsers(toSearch);
        if (response.status === 401) {
            await AuthService.logout();
            redir('/login')
        } else {
            const data = await response.json();
            setFoundUsers(data.users);
        }
    })

    const [fetchChats, isFetching] = useFetching(async (userId) => {
        const response = await ApiService.getUserChats(userId);
        setUserChats(response);
    })

    useEffect(() => {
        if (usersToSearch) {
            searchUsers(usersToSearch)
        }
    }, [usersToSearch])

    useEffect(() => {
        fetchChats(currUser.id);
    },[])

    return (
        <>
            {searchValue
                ? <div className={cl.chats_block}>
                    {isSearching
                        ? 'Searching...'
                        : foundUsers.map((user) => {
                            return <Chat chat={user} key={user.id} />
                        })}
                </div>
                : <div className={cl.chats_block}>
                    {isFetching
                        ? 'Loading...'
                        :  userChats.map((chat) => {
                            if (!chat.chatname) {
                                return <Chat chat={chat} key={chat.id}/>
                            }
                        })

                    }
                </div>
            }

        </>

    )
}

export default Chats;