import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
    userReducer,
    appReducer,
    getAllHotels,
    isLoading
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
    hotels: getAllHotels,
    isLoading: isLoading
});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
