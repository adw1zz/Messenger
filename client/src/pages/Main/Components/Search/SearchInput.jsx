import React from "react";
import cl from './SearchInput.module.css';

const SearchInput = ({ setIsSearchClicked }) => {

    const changeHandle = async (e) => {
        const { value } = e.target;
    }

    return (
        <div className={cl.search_input_block}>
            <input id="search_input" onChange={changeHandle} onClick={(e) => {
                e.target.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        setIsSearchClicked(false);
                    }
                })
            }}></input>
        </div>
    )
}

export default SearchInput;