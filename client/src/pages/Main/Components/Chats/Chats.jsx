import cl from './Chats.module.css';
import Chat from "../Chat/Chat";
import { useContext, useEffect, useState } from 'react';
import { useFetching } from '../../../../hooks/api-request';
import ApiService from '../../../../services/http-api-service';
import { AuthorizationContext } from '../../../../context/context';
import AuthService from '../../../../services/auth-service';

const Chats = ({ usersToSearch }) => {
    const redir = useContext(AuthorizationContext).nav;
    const [foundUsers, setFoundUsers] = useState([]);

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

    useEffect(() => {
        if (usersToSearch) {
            searchUsers(usersToSearch)
        }
    }, [usersToSearch])

    return (
        <div className={cl.chats_block}>
            {isSearching
                ? 'Searching...'
                : foundUsers.map((user) => {
                    return <Chat user={user} key={user.id}/>
                })}
        </div>
    )
}

export default Chats;