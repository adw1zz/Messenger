import {combineReducers, legacy_createStore} from "redux";
import { userFetchReducer } from "./reducers/userFetchReducer";
import { wsReducer } from "./reducers/wsReducer";

const rootReducer = combineReducers({
    userData: userFetchReducer,
    chatData: wsReducer
})

export const store = legacy_createStore(rootReducer);