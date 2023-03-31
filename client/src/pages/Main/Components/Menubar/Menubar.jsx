import React, { useState } from "react";
import { Link } from "react-router-dom";
import cl from './Menubar.module.css';
import '../../../icons/options/options.css';
import '../../../icons/search/search.css';
import SearchInput from "../Search/SearchInput";
import AuthService from "../../../../services/auth-service";

const Menubar = () => {
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    return (
        <div className={cl.menubar_block}>
            <div>
                {isSearchClicked
                    ? <SearchInput setIsSearchClicked={setIsSearchClicked}/>
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