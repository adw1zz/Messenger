import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import cl from './LoginForm.module.css';
import AuthService from "../../../services/auth-service";
import { AuthorizationContext } from "../../../context/context";

const LoginForm = () =>{
    const [formValue, setFormValue] = useState({email: '', password: ''});
    const redir = useContext(AuthorizationContext).nav;
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    }
    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const response = await AuthService.login({...formValue});
        if (response.status === 200) {
            redir('/')
        }
    }

    return (
            <div className={cl.login_form_block}>
                <form onSubmit={handleFormSubmit} autoComplete="off">
                    <div className={cl.login_form}>
                        <div>
                            Login
                        </div>
                        <div>
                            <input name="email" type="email" value={formValue.email} onChange={handleInput} placeholder="Email"></input>
                        </div>
                        <div>
                            <input name="password" autoComplete="new-password" type="password" minLength="8" maxLength="32" value={formValue.password} onChange={handleInput} placeholder="Password"></input>
                        </div>
                        <div>
                            <button className={cl.form_button} type="submit">Submit</button>
                        </div>
                        <div>
                            <Link to="/registration">Registration</Link>
                        </div>
                    </div>
                </form>
            </div>
            
    )
}

export default LoginForm;