import React from "react";
import LoginForm from './Components/LoginForm';

const Login = ({setUserData}) => {
    return (
        <LoginForm setUserData={setUserData}/>
    )
}

export default Login;