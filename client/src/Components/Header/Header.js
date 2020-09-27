import React, {useEffect, useState} from "react";
import "./Header.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import {Input, Button} from "antd";
import {isAuth} from "../../Utils/auth";
const {Search} = Input;

function Header() {
    const handleLogout=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
     
    return (
        <div className={`header`}>
            <div className="logo">
                <p>Kanban  🚀 </p>
            </div>
            <div className="nav-links">
                <Link className="navLink" to={"/"}>
                    Home
                </Link>
                {isAuth() ? (
                    <>
                        <Link className="navLink" to={"/dashboard"}>
                            Dashboard
                        </Link>
                        <Link
                            className="navLink"
                            onClick={handleLogout}
                            to={"/login"}
                        >
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="navLink" to={"/login"}>
                            Login
                        </Link>
                        <Link className="navLink" to={"/register"}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
