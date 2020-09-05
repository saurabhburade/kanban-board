import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";
import logger from "redux-logger";
import boardReducers from "./board/board.reducers"
import userReducers from "./user/user.reducers";
const rootReducer = combineReducers({
    board: boardReducers,
    user: userReducers,
});

export const store=createStore(rootReducer,applyMiddleware(thunk,logger))