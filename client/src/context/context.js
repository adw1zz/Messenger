import {createContext} from "react";

export const AuthorizationContext = createContext({
    nav: null,
    setUserData: null,
    userData: {},
    userOptions: {},
});
