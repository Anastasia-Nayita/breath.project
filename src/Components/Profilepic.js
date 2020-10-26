import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function ({ first, last, imageUrl, clickHandler }) {
    return (
        <div className="profilepic">
            <Avatar src={imageUrl} onClick={clickHandler} />
        </div>
    );
}
