import React, { useEffect, useState } from "react";
import cl from "./UserOptionsModal.module.css";
import defaultAvatar from "../../../../assets/default_avatar.png";
import "../../../icons/eye_close/eye-alt.css";
import "../../../icons/eye_open/eye.css";
import { Link } from "react-router-dom";
import AuthService from "../../../../services/auth-service";
import ApiService from "../../../../services/http-api-service";

const UserOptionsModal = ({ showOptions, setShowOptions }) => {
    const [selectTheme, setSelectTheme] = useState(false);
    const [formValue, setFormValue] = useState({ avatar: {}, nickname: '', background: {} })

    const handleInput = (e) => {
        const {name} = e.target;
        if (name === "avatar" || name === "background") {
            setFormValue({ ...formValue, [name]: e.target.files[0]})
        } else {
            const {value} = e.target;
            setFormValue({ ...formValue, [name]: value })
        }
    }

    const escapeHandle = (e) => {
        if (e.key === "Escape") {
            setShowOptions(false);
        }
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        console.log(formValue);
        const resp = await ApiService.updateUserOptions(formValue);
        console.log(resp);
    }

    useEffect(() => {
        if (!showOptions) {
            document.body.removeEventListener('keydown', escapeHandle);
        }
    }, [showOptions])

    useEffect(() => {
        document.body.addEventListener('keydown', escapeHandle);
    }, [])

    return (
        <div className={cl.modal}>
            <form className={cl.form_block} onSubmit={onSubmitHandle}>
                <div className={cl.modal_content}>
                    <div className={cl.user_avatar}>
                        <img src={defaultAvatar}></img>
                        <div>
                            <label>
                                Change user avatar
                                <input name="avatar" onChange={handleInput} type="file" />
                            </label>
                        </div>
                    </div>
                    <div className={cl.user_nickname}>
                        <label>
                            Change user nickname
                            <input name="nickname" type="text" value={formValue.nickname} onChange={handleInput} />
                        </label>
                    </div>
                    <div className={cl.background}>
                        <label>
                            Change chat background
                            <input name="background" type="file" onChange={handleInput} />
                        </label>
                    </div>
                    <div className={cl.user_theme} >
                        <label>
                            Change application theme
                        </label>
                        <i name="theme" className={!selectTheme ? "gg-eye-alt" : "gg-eye"} onClick={() => setSelectTheme(!selectTheme)} />
                    </div>
                    <div className={cl.sub_btn}>
                        <button>Submit</button>
                    </div>
                    <div className={cl.logout_btn}>
                        <Link to="/login" onClick={async () => await AuthService.logout()}>
                            Logout
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserOptionsModal;