import React from "react";
import "./Login.css";
import {Input,Button} from "antd";
import loginImage from "../../assets/undraw_status_update_jjgk.svg";
import {login, isAuth} from "../../Utils/auth";
import { Redirect } from 'react-router-dom';
function Login() {
    const handleLogin = e => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        login(data);
    };
    if (isAuth()) {
        return <Redirect to="/chat" />;
    }
    return (
        <div className="login-container">
            <form className="form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input.Password type="password" name="password" required />
                </div>
                <Button type="submit" size={"sm"}>
                    Login
                </Button>
            </form>
            <img src={loginImage} className="loginImage" alt="" />
        </div>
    );
}

export default Login;
