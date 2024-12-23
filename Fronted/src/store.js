import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
    userReducer,
    appReducer,
    getAllHotels,
    isLoading,
    getHotelById
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
    hotels: getAllHotels,
    isLoading: isLoading,
    hotel: getHotelById
});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
