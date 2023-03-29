import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import cl from './Main.module.css';

const Main = () => {
    return  (
        <div>
            <Menubar/>
            <div className={cl.main_block}>    
                <Chats/>
                <ChatWindow/>
            </div>
        </div>
    )
}

export default Main;