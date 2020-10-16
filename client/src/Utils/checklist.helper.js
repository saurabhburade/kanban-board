import Axios from "axios";
import {message} from "antd";

export const fetchChecklist = (_id, cb) => {
    Axios.get("/api/board/task/checklist/fetch", {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
            _id,
        },
    })
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
                        message.error("Failed to fetch Checklist");

        });
};
