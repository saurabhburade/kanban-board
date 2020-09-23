import Axios from "axios";
import {message} from "antd";

export const addBoard = (data, cb) => {
    Axios.post("/api/board/create", data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            cb("success");
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error");
            message.error("Failed to add board");
        });
};

export const deleteBoard = (data, cb) => {
    Axios.delete("http://localhost:8000/api/board/delete/" + data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            cb("success");
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error");
            message.error("Failed to add board");
        });
};
export const updateOnTaskMove = (data, cb) => {
    console.log(data);
    Axios.post("http://localhost:8000/api/board/update/task/move", data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            cb("success");
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error");
            message.error("Failed");
        });
};
export const addTask = (data, cb) => {
    console.log(data);
    Axios.post("http://localhost:8000/api/board/add/column/task", data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            cb("success");
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error");
            message.error("Failed");
        });
};
export const addColumn = (data, cb) => {
    console.log(data);
    Axios.post("http://localhost:8000/api/board/add/column", data, {
        headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("token"),
        },
    })
        .then(res => {
            console.log(res);
            cb("success");
            message.success("Success");
        })
        .catch(err => {
            console.log(err);
            cb("error");
            message.error("Failed");
        });
};
