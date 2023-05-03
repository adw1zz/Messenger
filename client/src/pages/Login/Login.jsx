import React, { useContext, useState } from "react";
import LoginForm from './LoginForm';
import "../../styles/login.scss";
import AuthService from "../../services/auth-service";
import { AuthorizationContext } from "../../context/context";
import { useFetching } from "../../hooks/api-request";
import Loader from "../../resused/Loader/Loader";

const Login = () => {

    const [onError, setOnError] = useState({});
    const redir = useContext(AuthorizationContext).nav;
    const setUser = useContext(AuthorizationContext).setUserData;
    const [login, isProcessing] = useFetching(async (formValue) => {
        const response = await AuthService.login(formValue);
        if (!response.user) {
            setOnError(response);
        } else {
            setUser(response.user);
            //redir('/');
        }
    }) 

    return (
        <div className="login">
            {isProcessing
                ? <Loader/>
                : Object.keys(onError).length !== 0 
                    ? <LoginForm onError={onError} reset={setOnError}/>
                    : <LoginForm callback={login}/>
            }
        </div>
    )
}

export default Login;