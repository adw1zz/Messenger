import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import cl from './Main.module.css';
import { SessionContext } from "../../context/context";
import { useState } from "react";

const Main = () => {
    const [foundUser, setFoundUser] = useState();

    return (
        <SessionContext.Provider value={{setFoundUser: setFoundUser, foundUser: foundUser}}>
            <div>
                <Menubar />
                <div className={cl.main_block}>
                    <Chats/>
                    <ChatWindow />
                </div>
            </div>
        </SessionContext.Provider>
    )
}

export default Main;