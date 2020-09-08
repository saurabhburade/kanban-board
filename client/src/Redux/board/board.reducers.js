import {FETCH_BOARD_SUCCESS} from "./board.actionTypes";


const INITIAL_STATE = {
    board:{}
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BOARD_SUCCESS:
            return {
                ...state,
                board: action.payload,
            };
        default:
            return state;
    }
};