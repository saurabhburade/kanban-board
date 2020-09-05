import React, {useEffect, useState} from "react";
import "./Header.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import {Input, Button} from "antd";
import {isAuth} from "../../Utils/auth";
const {Search} = Input;

function Header() {
    const [Scroll, setScroll] = useState(false)
    const handleLogout=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
         {!!window && window.addEventListener(
             "scroll",
             () => {
                 if (parseInt(window.scrollY) >= 10) {
                     setScroll(true);
                 } else {
                     setScroll(false);
                 }
             })}
    return (
        <div className={`header ${Scroll?"sticky":""}`}>
            <div className="logo">
                <p>LOGO 🚀 </p>
            </div>
            <div className="nav-links">

                <Link className="navLink" to={"/"}>
                    Home
                </Link>
                {isAuth() ? (
                    <>
                        <Link className="navLink" to={"/chat"}>
                            Chat
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
