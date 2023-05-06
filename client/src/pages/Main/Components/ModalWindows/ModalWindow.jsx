import React, { useEffect } from "react";
import "../../../../styles/modal.scss";
import UserProfileForm from "./UserProfileForm";
import AddChatForm from "./AddChatForm";

const ModalWindow = ({modalState, setModalState, modalTitle, Child}) => {

    const escapeHandle = (e) => {
        if (e.key === "Escape") {
            setModalState(false)
        }
    }

    useEffect(()=> {
        if (!modalState) {
            document.body.removeEventListener('keydown', escapeHandle);
        }
    },[modalState])
    
    useEffect(() => {
        document.body.addEventListener('keydown', escapeHandle);
    },[])

    const currentChildComponent = (id) => {
        switch (id) {
            case "1": return <AddChatForm setModalState={setModalState}/>;
            case "2": return <UserProfileForm setModalState={setModalState}/>;
        }
    }


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span>{modalTitle}</span>
                </div>
                <div>
                    {currentChildComponent(Child)}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;