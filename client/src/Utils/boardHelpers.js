import Axios from "axios";
import { message } from "antd";


export const addBoard = (data,cb) => {
    Axios.post("/api/board/create", data, {
        headers: {
            "Content-type": "application/json",
            "token":localStorage.getItem("token")
        },
    })
        .then(res => {
            console.log(res);
            cb("success")
            message.info("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error")
            message.info("Failed to add board");
            
        });
};
