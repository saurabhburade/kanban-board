import React, {useState} from "react";
import {Input, Button, notification} from "antd";
import loginImage from "../../assets/undraw_status_update_jjgk.svg";
import {signup} from "../../Utils/auth";
import {isAuth} from "../../Utils/auth";
import {Redirect} from "react-router-dom";
import {Switch} from "antd";
import { updateUser } from '../../Utils/profile.helper';

function UpdateProfile(props) {
    const [updatePass, setUpdatePass] = useState(false);
    const [fname, setfname] = useState(props?.fname);
    const [lname, setlname] = useState(props?.lname);
    const [password, setpassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
    const [currentPassword, setcurrentPassword] = useState("");

    const handleUpdate = e => {
        e.preventDefault();

        const data = {
            fname,
            lname,
            password,
            newPassword,
            confirmNewPassword,
            currentPassword,
        };
        console.log(data,props, e.target.newPassword);

        if (
            !!data.fname.trim() &&
            !!data.lname.trim() &&
            data.newPassword.trim() === data.confirmNewPassword.trim()
        ) {
           updateUser(data)
        } else {
            notification["error"]({
                message: "Something went wrong ! ",
                description: "Please Enter Valid Details",
            });
        }
    };
    if (!isAuth() ) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="login-container">
            <form className="form" onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="fname">First Name</label>
                    <Input
                        type="text"
                        value={fname}
                        name="fname"
                        onChange={e => setfname(e.target.value)}
                        required
                    />
                </div>{" "}
                <div>
                    <label htmlFor="lname">Last Name</label>
                    <Input
                        type="text"
                        name="lname"
                        value={lname}
                        onChange={e => setlname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="mr-3">
                        Do you want to change the Password ?{" "}
                    </label>
                    <Switch
                        checked={updatePass}
                        onChange={c => {
                            setUpdatePass(c);
                        }}
                    />
                </div>
                {!updatePass ? (
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            type="password"
                            name="password"
                            onChange={e => setpassword(e.target.value)}
                            required
                        />
                    </div>
                ) : (
                    <>
                        <div>
                            <label htmlFor="currentPassword">
                                Current Password
                            </label>
                            <Input.Password
                                type="password"
                                name="currentPassword"
                                onChange={e =>
                                    setcurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword">
                                Enter New Password
                            </label>
                            <Input.Password
                                type="password"
                                name="newPassword"
                                onChange={e => setnewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword">
                                Confirm New Password
                            </label>
                            <Input.Password
                                type="password"
                                name="confirmNewPassword"
                                onChange={e =>
                                    setconfirmNewPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </>
                )}
                <button
                    className="btn btn-sm bg-primary text-white"
                    type="submit"
                    size={"sm"}
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
