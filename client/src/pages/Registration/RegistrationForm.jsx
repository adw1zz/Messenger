import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/registration.scss";

const RegistrationForm = ({ callback, onError, reset }) => {

    const [formValue, setFormValue] = useState({ email: '', nickname: '', password: '', repeatPassword: '' });

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        callback({ ...formValue })
    }

    return (
        <div className="registration-form-block">
            <form onSubmit={handleFormSubmit} autoComplete="off">
                <div className="registration-form">
                    <div>
                        Registration
                    </div>
                    <div>
                        <input name="email" type="email" value={formValue.email} onChange={inputHandle} placeholder="Email" required={true} />
                    </div>
                    <div>
                        <input name="nickname" type="text" value={formValue.nickname} onChange={inputHandle} placeholder="Nickname"
                            minLength={1} maxLength={8} required={true}
                        />
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
                                <Link to="/login">Login</Link>
                            </div>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm;