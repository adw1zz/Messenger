import React from "react";
import cl from './SearchInput.module.css';

const SearchInput = ({ setIsSearchClicked, setUsersToSearch }) => {

    const onClickHandle = (e) => {
        const inp = e.target;
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setIsSearchClicked(false);
            } else if (e.key === 'Enter') {
                setUsersToSearch(inp.value);
            }
        })
    }

    return (
        <div className={cl.search_input_block}>
            <input id="search_input" onClick={onClickHandle}></input>
        </div>
    )
}

export default SearchInput;