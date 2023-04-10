import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import cl from './Main.module.css';
import { AuthorizationContext, SessionContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import AuthService from "../../services/auth-service";
import { useFetching } from "../../hooks/api-request";

const Main = () => {
    const redir = useContext(AuthorizationContext).nav;
    const [usersToSearch, setUsersToSearch] = useState('');
    const [messages, setMessages] = useState([{ from: '', text: '', datetime: '' }]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const setUsr = useContext(AuthorizationContext).setUserData;


    const [validate, isValidating] = useFetching(async () => {
        const response = await AuthService.validateToken();
        if (!response) {
            redir('/login')
        } else {
            setUsr(response.user);
        }
    })

    useEffect(() => {
        validate();
    }, [])

    return (
        <SessionContext.Provider value={{
            messages: messages, setMessages: setMessages, isSearchClicked: isSearchClicked,
            setIsSearchCliced: setIsSearchClicked
        }} >
            {isValidating
                ? <></>
                : <div>
                    <Menubar setUsersToSearch={setUsersToSearch} />
                    <div className={cl.main_block}>
                        <Chats usersToSearch={usersToSearch} />
                        <ChatWindow />
                    </div>
                </div>
            }
        </SessionContext.Provider>
    )
}

export default Main;