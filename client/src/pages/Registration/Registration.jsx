import React, {useState, useContext} from "react";
import RegistrationForm from "./RegistrationForm";
import Loader from "../../resused/Loader/Loader.jsx";
import {AuthorizationContext} from "../../context/context";
import {useFetching} from "../../hooks/api-request";
import AuthService from "../../services/auth-service";
import "../../styles/registration.scss";

const Registration = () => {

    const redir = useContext(AuthorizationContext).nav;
    const [onError, setOnError] = useState({});
    const [registration, isProcessing] = useFetching(async (formValue) => {
        const err = await AuthService.registration(formValue);
        if (err) {
            setOnError(err);
        } else {
            redir('/login');
        }
    })

    return (
        <div className="registration">
            {isProcessing
                ? <Loader/>
                : Object.keys(onError).length !== 0
                    ? <RegistrationForm onError={onError} reset={setOnError}/>
                    : <RegistrationForm callback={registration}/>
            }
        </div>
    )
}

export default Registration;