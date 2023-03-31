import {createContext} from "react";

export const AuthorizationContext = createContext({
    nav: null,
    user: {}
});

export const SessionContext = createContext({
    setFoundUsers: null,
    foundUsers: []
})