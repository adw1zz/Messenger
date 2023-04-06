import {createContext} from "react";

export const AuthorizationContext = createContext({
    nav: null,
    setUserData: null,
    userData: {},
    userOptions: {},
    socketURL: "ws://localhost:5000/api/"
});

export const SessionContext = createContext({
    messages: [{from: '', text: '', datetime: ''}],
    setMessages: null,
    isSearchClicked: Boolean,
    setIsSearchCliced: null
})