
import { FETCH_USER_SUCCESS, FETCH_USER_FAIL } from './user.actionTypes';
import  Axios  from 'axios';

export const fetchUser=()=>{
    const config={headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("token")
    }}
    return dispatch=>{
        
        
        Axios.get("/api/user/user", {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        })
            .then(res => {
                console.log("res", res);
                if (!!res.data) {
                    dispatch(fetchUserSuccess(res.data))
                }
            })
            .catch(err => {
                console.log("err", err);
            });
    }
}



 function fetchUserSuccess(payload) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: payload,
    };
}

export function fetchUserFail() {
    return {
        type: FETCH_USER_FAIL,
    };
}
