import React, { useContext, useEffect, useState } from "react";
import "../../../../styles/menubar.scss";
import DefaultAvatar from "../../../../assets/circle-user.png";
import SearchIcon from "../../../../assets/add.png";
import ApiService from "../../../../services/http-api-service";
import { useFetching } from "../../../../hooks/api-request";
import { AuthorizationContext } from "../../../../context/context";
import ModalWindow from "../ModalWindows/ModalWindow";

const Menubar = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [childForm, setChildForm] = useState(0);
    const redir = useContext(AuthorizationContext).nav;
    const setUser = useContext(AuthorizationContext).setUserData;

    const [getUserData] = useFetching(async () => {
        const response = await ApiService.getUserData();
        if (!response) {
            redir('/login')
        } else {
            setUser(response.user);
        }
    })

    useEffect(() => {
        getUserData();
    }, [])

    const onClickHandle = (e) => {
        setShowModal(true)
        const { id } = e.target;
        setChildForm(id);
        switch (id) {
            case "1": setModalTitle("Add chat with"); break;
            case "2": setModalTitle("User Profile"); break;
        }
    }

    return (
        <>
            <div className="menubar">
                <div className="menubar-block">
                    <div>
                        <img id={1} src={SearchIcon} 
                        />
                    </div>
                    <div>
                        <img id={2} src={DefaultAvatar} 
                            onClick={onClickHandle}
                        />
                    </div>
                </div>
            </div>
            {showModal
                ? <ModalWindow modalState={showModal} setModalState={setShowModal}
                    modalTitle={modalTitle} Child={childForm}
                />
                : <></>
            }
        </>
    )
}

export default Menubar;