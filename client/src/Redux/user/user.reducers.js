import {FETCH_USER_SUCCESS} from "./user.actionTypes";


const INITIAL_STATE = {
    user:{}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user:action.payload
            };
        default:
            return state;
    }
};