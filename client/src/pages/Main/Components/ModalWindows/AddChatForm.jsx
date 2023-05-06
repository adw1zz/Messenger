import React, { useContext, useEffect, useState } from "react";
import "../../../../styles/add-chat-form.scss";
import { AuthorizationContext } from "../../../../context/context";
import { useFetching } from "../../../../hooks/api-request";
import ApiService from "../../../../services/http-api-service";
import Loader from "../../../../resused/Loader/Loader";
import { useDispatch } from "react-redux";

const AddChatForm = ({ setModalState }) => {

    const redir = useContext(AuthorizationContext).nav;
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const [addChat, isChatAdding] = useFetching(async (userTag) => {
        const response = await ApiService.addChat(userTag);
        if (!response) {
            redir('/login')
        } else {
            dispatch({type: 'FETCH_DATA'});
            setModalState(false);
        }
    })

    const onClickFormSubmit = (e) => {
        e.preventDefault();
        addChat(inputValue)
    }

    return (
        <form className="form" onSubmit={onClickFormSubmit}>
            {isChatAdding
                ? <Loader />
                : <>
                    <div className="user-tag-input">
                        <input type="text" onChange={(e) => setInputValue(e.target.value)} 
                            required={true} placeholder="Enter user tag"
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </>
            }
        </form>
    )
}

export default AddChatForm;