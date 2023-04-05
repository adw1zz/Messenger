import React, { useContext, useState } from "react";
import cl from './TextInput.module.css';
import WSService from "../../../../services/ws-api-service";
import { AuthorizationContext } from "../../../../context/context";

const TextInput = () =>{
    
    const usr = useContext(AuthorizationContext).userData;

    const onClickHandle = (e) => {
        const inp = e.target;
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && inp.value !== '') {
                WSService.sendMessage(inp.value, usr);
                inp.value = '';
            }
        })
    }
    
    return (
        <div className={cl.input_block}>
            <input type='text' onClick={onClickHandle}></input>
        </div>
    )
}

export default TextInput;