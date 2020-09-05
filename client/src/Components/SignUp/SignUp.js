import React from "react";
import "./SignUp.css";
import {Input, Button} from "antd";
import loginImage from "../../assets/undraw_status_update_jjgk.svg";
import {signup} from "../../Utils/auth";
import {isAuth} from "../../Utils/auth";
import {Redirect} from "react-router-dom";

function SignUp() {
    const handleSignUp = e => {
        e.preventDefault();
        const data = {
            fname: e.target.fname.value,
            lname: e.target.lname.value,
            email: e.target.email.value,
            confPassword: e.target.confPassword.value,
            password: e.target.password.value,
        };
        if (
            !!data.fname.trim() &&
            !!data.lname.trim() &&
            !!data.password.trim() &&
            data.password === data.confPassword
        ) {
            signup(data);
        }
    };
    if (isAuth()) {
        return <Redirect to="/chat" />;
    }
    return (
        <div className="login-container">
            <form className="form" onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="fname">First Name</label>
                    <Input type="text" name="fname" required />
                </div>{" "}
                <div>
                    <label htmlFor="lname">Last Name</label>
                    <Input type="text" name="lname" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input.Password type="password" name="password" required />
                </div>{" "}
                <div>
                    <label htmlFor="confPassword">Confirm Password</label>
                    <Input.Password
                        type="password"
                        name="confPassword"
                        required
                    />
                </div>{" "}
                <Button type="submit" size={"sm"}>
                    Sign Up
                </Button>
            </form>
            <img src={loginImage} className="loginImage" alt="" />
        </div>
    );
}

export default SignUp;
