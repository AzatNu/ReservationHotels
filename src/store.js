import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
    userReducer,
    appReducer
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
