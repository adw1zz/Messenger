import React from "react";
import "../../styles/main.scss";
import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import { Provider } from "react-redux";
import { store } from "../../store/index";

const Main = () => {

    return (
        <Provider store={store}>
            <div className="main">
                <Menubar />
                <div className="main-content">
                    <Chats />
                    <ChatWindow />
                </div>
            </div>
        </Provider>
    )
}

export default Main;