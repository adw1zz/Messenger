import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import cl from './Menubar.module.css';
import '../../../icons/options/options.css';
import '../../../icons/search/search.css';
import SearchInput from "../Search/SearchInput";
import AuthService from "../../../../services/auth-service";
import { SessionContext } from "../../../../context/context";

const Menubar = () => {
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const setFoundUser = useContext(SessionContext).setFoundUser;
    return (
        <div className={cl.menubar_block}>
            <div>
                {isSearchClicked
                    ? <SearchInput setIsSearchClicked={setIsSearchClicked} setFoundUser={setFoundUser} />
                    : <i className="gg-search" onClick={() => setIsSearchClicked(true)}></i>
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