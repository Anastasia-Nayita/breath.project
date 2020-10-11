import React from "react";

export default function ({ first, last, profilepic }) {
    return (
        <div className="profile-bg">
            <div className="profile-info">
                {profilepic}

                <h3>
                    {first} {last}
                </h3>
            </div>
        </div>
    );
}
