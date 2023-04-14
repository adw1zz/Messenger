import React, { useEffect, useState } from "react";
import cl from "./UserOptionsModal.module.css";
import defaultAvatar from "../../../../assets/default_avatar.png";
import "../../../icons/eye_close/eye-alt.css";
import "../../../icons/eye_open/eye.css";

const UserOptionsModal = ({showOptions, setShowOptions}) => {
    const [selectTheme, setSelectTheme] = useState(false);

    const escapeHandle = (e) => {
        if (e.key === "Escape") {
            setShowOptions(false);
        }
    }

    useEffect(() => {
        if (!showOptions) {
            document.body.removeEventListener('keydown', escapeHandle);
        }
    },[showOptions])

    useEffect(() => {
        document.body.addEventListener('keydown', escapeHandle);
    }, [])

    return (
        <div className={cl.modal}>
            <div className={cl.modal_content}>
                <div className={cl.user_avatar}>
                    <img src={defaultAvatar}></img>
                    <input type="file" />
                </div>
                <div className={cl.user_nickname}>
                    <input type="text" />
                </div>
                <div className={cl.user_theme} onClick={() => setSelectTheme(!selectTheme)}>
                    <i className={selectTheme ? "gg-eye-alt" : "gg-eye"} />
                </div>
            </div>
        </div>
    )
}

export default UserOptionsModal;