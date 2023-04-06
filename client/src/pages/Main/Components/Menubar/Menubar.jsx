import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import cl from './Menubar.module.css';
import '../../../icons/options/options.css';
import '../../../icons/search/search.css';
import SearchInput from "../Search/SearchInput";
import AuthService from "../../../../services/auth-service";
import { SessionContext } from "../../../../context/context";

const Menubar = ({setUsersToSearch}) => {
    const searchValue = useContext(SessionContext).isSearchClicked;
    const searchSet = useContext(SessionContext).setIsSearchCliced;

    return (
        <div className={cl.menubar_block}>
            <div>
                {searchValue
                    ? <SearchInput setIsSearchClicked={searchSet} setUsersToSearch={setUsersToSearch}/>
                    : <i className="gg-search" onClick={() => searchSet(true)}></i>
                }
            </div>
            <div>
                <i className="gg-options"></i>
            </div>
            <div>
                <Link to="/login" onClick={() => {
                    AuthService.logout();
                }}>Logout</Link>
            </div>
        </div>
    )
}

export default Menubar;