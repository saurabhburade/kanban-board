import Axios from "axios";
import {message} from "antd";

export const updateUser = (data) => {
    Axios.patch("/api/user/update", data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            message.error("Failed to add board");
        });
};
