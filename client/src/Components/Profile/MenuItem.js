import React from "react";
import "./MenuItem.css";
function MenuItem({icon, name, address}) {
    return (
        <div className="menu-item">
            <div className="menu-icon m-0 p-0">{icon}</div>
            <div className="menu-name ">{name}</div>
        </div>
    );
}

export default MenuItem;
