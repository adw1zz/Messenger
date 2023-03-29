import React from "react";
import cl from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={cl.not_found_block}>
            <div className={cl.not_found_msg}>
                <div>
                    404
                </div>
                <div>
                    Not Found
                </div>
            </div>
        </div>
    )
}

export default NotFound