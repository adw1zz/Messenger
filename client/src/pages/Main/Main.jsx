import React from "react";
import "../../styles/main.scss";
import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";

const Main = () => {
   
    return (
        <div className="main">
            <Menubar/>
            <div className="main-content">
                <Chats/>
                <ChatWindow/>
            </div>
        </div>
    )
}

export default Main;