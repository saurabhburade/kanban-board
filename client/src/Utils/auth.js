import Axios from "axios";

export const login = data => {
    console.log(data);
    Axios.post("/api/login", data, {
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("_id", res.data._id);
            window.location.href = "/chat";
        })
        .catch(err => {
            console.log(err);
            localStorage.clear();
        });
};

export const signup = data => {
    Axios.post("/api/register", data, {
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("_id", res.data._id);
            window.location.href = "/chat";
        })
        .catch(err => {
            console.log(err);
            localStorage.clear();
        });
};
export const isAuth = () => {
    if (
        window !== undefined &&
        localStorage?.getItem("token") &&
        localStorage.getItem("_id")
    ) {
        return true;
    } else {
        return false;
    }
};
