import React from "react";
import cl from './SearchInput.module.css';
import ApiService from '../../../../services/api-service';

const SearchInput = ({ setIsSearchClicked, setFoundUsers}) => {

    const changeHandle = async (e) => {
        const { value } = e.target;
        console.log(value);
    }

    return (
        <div className={cl.search_input_block}>
            <input id="search_input" onChange={changeHandle} onClick={(e) => {
                e.target.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        setIsSearchClicked(false);
                        setFoundUsers([]);
                    }
                })
            }}></input>
        </div>
    )
}

export default SearchInput;