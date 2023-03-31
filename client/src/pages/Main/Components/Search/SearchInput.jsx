import React from "react";
import cl from './SearchInput.module.css';
import ApiService from '../../../../services/api-service';

function handler(setIsSearchClicked, setFoundUser) {
    const inp = document.getElementById('search_input');
    inp.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const response = await ApiService.searchUser(inp.value);
            setFoundUser(response.foundUser);
        } else if (e.key === 'Escape') {
            setIsSearchClicked(false);
            setFoundUser('');
        }
    })
}

const SearchInput = ({setIsSearchClicked, setFoundUser}) => {
    return (
        <div className={cl.search_input_block}>
            <input id="search_input" onClick={() => handler(setIsSearchClicked, setFoundUser)}></input>
        </div>
    )
}

export default SearchInput;