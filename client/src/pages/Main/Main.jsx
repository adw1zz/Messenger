import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import cl from './Main.module.css';
import { AuthorizationContext, SessionContext } from "../../context/context";
import { useState, useContext, useEffect } from "react";
import AuthService from "../../services/auth-service";

const Main = () => {
    const [foundUser, setFoundUser] = useState();
    const redir = useContext(AuthorizationContext).nav;

    useEffect(() => {
        const validate = async () => {
            const response = await AuthService.validateToken();
            if (response.status === 401) {
                redir('/login');
            }
        };
        validate();
    },[])

    return (
        <SessionContext.Provider value={{ setFoundUser: setFoundUser, foundUser: foundUser }}>
            <div>
                <Menubar />
                <div className={cl.main_block}>
                    <Chats />
                    <ChatWindow />
                </div>
            </div>
        </SessionContext.Provider>
    )
}

export default Main;