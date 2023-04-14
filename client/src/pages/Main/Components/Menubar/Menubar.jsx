import React, { useContext, useState } from "react";
import cl from './Menubar.module.css';
import '../../../icons/options/options.css';
import '../../../icons/search/search.css';
import SearchInput from "../Search/SearchInput";
import { SessionContext } from "../../../../context/context";
import defaultAvatar from "../../../../assets/default_avatar.png";
import UserOptionsModal from "../User/UserOptionsModal";

const Menubar = ({ setUsersToSearch }) => {
    const searchValue = useContext(SessionContext).isSearchClicked;
    const searchSet = useContext(SessionContext).setIsSearchCliced;
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div>
            <div className={cl.menubar_block}>
                <div className={cl.search}>
                    {searchValue
                        ? <SearchInput setIsSearchClicked={searchSet} setUsersToSearch={setUsersToSearch} />
                        : <i className="gg-search" onClick={() => searchSet(true)}></i>
                    }
                </div>
                <div className={cl.avatar}>
                    <img src={defaultAvatar} onClick={() => setShowOptions(true)} />
                </div>

            </div>
            {showOptions
                ? <UserOptionsModal showOptions={showOptions} setShowOptions={setShowOptions} />
                : <></>
            }
        </div>

    )
}

export default Menubar;