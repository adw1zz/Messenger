import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.scss";

const LoginForm = ({ callback, onError, reset }) => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }
    const formSubmitHandle = (e) => {
        e.preventDefault();
        callback({ ...formValue })
    }

    return (
        <div className="login-form-block">
            <form onSubmit={formSubmitHandle} autoComplete="off">
                <div className="login-form">
                    <div>
                        Login
                    </div>
                    <div>
                        <input name="email" type="email" value={formValue.email} onChange={inputHandle} placeholder="Email" required={true} />
                    </div>
                    <div>
                        <input name="password" type="password" value={formValue.password} onChange={inputHandle} placeholder="Password"
                            minLength={8} maxLength={16} required={true}
                        />
                    </div>
                    {onError
                        ? <>
                            <div>
                                <span>{onError.message}</span>
                            </div>
                            <div>
                                <button onClick={() => reset({})}>Ok</button>
                            </div>
                        </>
                        : <>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                            <div>
                                <Link to="/registration">Registration</Link>
                            </div>
                        </>
                    }
                </div>
            </form>
        </div>

    )
}

export default LoginForm;