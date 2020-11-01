import React from "react";
import "./UserProfile.css";
function UserProfile({name, email, initial}) {
    return (
        <div className="user-profile-cont">
            <div className="user-details">
                <div className="user-initial">
                    <p> {initial}</p>
                    <p>{name}</p>
                </div>
                <p>Email : {email}</p>
            </div>
        </div>
    );
}

export default UserProfile;
