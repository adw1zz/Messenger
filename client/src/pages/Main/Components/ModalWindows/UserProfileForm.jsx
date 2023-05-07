import React, { useContext, useState } from "react";
import "../../../../styles/user-profile-form.scss";
import { AuthorizationContext } from "../../../../context/context";
import ChooseAvatar from "../../../../assets/mode-portrait.png";
import ChooseBackground from "../../../../assets/mode-landscape.png";
import AuthService from "../../../../services/auth-service";
import Loader from "../../../../resused/Loader/Loader";
import { useFetching } from "../../../../hooks/api-request";
import ApiService from "../../../../services/http-api-service";

const UserProfileForm = ({ setModalState }) => {

    const userData = useContext(AuthorizationContext).userData;
    const setUser = useContext(AuthorizationContext).setUserData;
    const redir = useContext(AuthorizationContext).nav;
    const [inputValue, setInputValue] = useState('');

    const [updateUser, isUserUpdating] = useFetching(async (inputValue) => {
        const response = await ApiService.updateUser(inputValue);
        if (!response) {
            redir('/login')
        } else {
            setUser(response.user);
            setModalState(false);
        }
    })

    const onLogoutClickHandle = async (e) => {
        e.stopPropagation();
        await AuthService.logout();
        redir('/login');
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        await updateUser(inputValue);
    }

    return (
        <>
            {
                isUserUpdating
                    ? <Loader />
                    : <form className="form" onSubmit={onSubmitHandle}>
                        <div className="user-tag-input">
                            <input disabled={true} placeholder={userData.userTag} />
                        </div>
                        <div className="user-nickname-input">
                            <input type="text" maxLength={8} defaultValue={userData.nickname}
                                required={true} onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <div className="user-profile-form-avatar">
                            <div>
                                <span>default</span>
                            </div>
                            <div>
                                <img src={ChooseAvatar} />
                            </div>
                        </div>
                        <div className="user-profile-form-background">
                            <div>
                                <span>default</span>
                            </div>
                            <div>
                                <img src={ChooseBackground} />
                            </div>
                        </div>
                        <div className="user-profile-form-submit-button">
                            <button type="submit">Submit</button>
                        </div>
                        <div className="user-profile-form-logout-button">
                            <button type="button" onClick={onLogoutClickHandle}>Logout</button>
                        </div>
                    </form>
            }
        </>
    )
}

export default UserProfileForm;