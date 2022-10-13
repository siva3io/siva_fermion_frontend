import {combineReducers} from "redux";
import DataReducers from "./reducer";

const rootReducer = combineReducers({
    data:DataReducers
});

export default rootReducer;