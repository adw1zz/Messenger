import Menubar from "./Components/Menubar/Menubar";
import Chats from "./Components/Chats/Chats";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import cl from './Main.module.css';
import { AuthorizationContext} from "../../context/context";
import { useContext, useEffect } from "react";
import AuthService from "../../services/auth-service";
import { useFetching } from "../../hooks/api-request";

const Main = () => {
    const redir = useContext(AuthorizationContext).nav;

    const [validate, isValidating] = useFetching(async () => {
        const response = await AuthService.validateToken();
        if (response.status === 401) {
            redir('/login')
        }
    })

    useEffect(() => {
        validate();
    }, [])

    return (
        <>
            {isValidating
                ? <></>
                : <div>
                    <Menubar />
                    <div className={cl.main_block}>
                        <Chats />
                        <ChatWindow />
                    </div>
                </div>
            }
        </>
    )
}

export default Main;