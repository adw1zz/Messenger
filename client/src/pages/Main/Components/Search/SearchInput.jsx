import React from "react";
import cl from './SearchInput.module.css';

function handler(callback) {
    const inp = document.getElementById('search_input');
    inp.addEventListener('change', (e) => {
        
    })
    inp.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            callback(false)
        }
    })
}

const SearchInput = ({setIsSearchClicked}) => {
    return (
        <div className={cl.search_input_block}>
            <input id="search_input" onClick={() => handler(setIsSearchClicked)}></input>
        </div>
    )
}

export default SearchInput;