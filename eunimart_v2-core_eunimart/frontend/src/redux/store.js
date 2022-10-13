import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewars = [reduxThunk];

 middlewars.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middlewars));

export default store;