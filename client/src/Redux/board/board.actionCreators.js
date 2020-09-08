import {FETCH_BOARD_FAIL} from "./board.actionTypes";
import {FETCH_BOARD_SUCCESS} from "./board.actionTypes";
import  Axios  from 'axios';

export const fetchBoard = data => {
    return dispatch => {
        Axios.get("http://localhost:8000/api/board/public/" + data, {
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(res => {
                console.log("res", res);
                if (!!res.data) {
                    dispatch(fetchBoardSuccess(res.data));
                }
            })
            .catch(err => {
                console.log("err", err);
            });
    };
};
function fetchBoardSuccess(payload) {
    return {
        type: FETCH_BOARD_SUCCESS,
        payload: payload,
    };
}

function fetchBoardFail() {
    return {
        type: FETCH_BOARD_FAIL,
    };
}
