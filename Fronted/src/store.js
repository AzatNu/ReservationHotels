import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import {
    userReducer,
    appReducer,
    getAllHotels,
    isLoading,
    getHotelById,
    getRoomsByHotelId,
    refreshPage,
    errors,
    getReservationByRoomId,
    getReservationRoomsByUserLogin,
    deleteReservationByIdSuccess,
    getAllReservationReducer,
    deleteRoomSuccess,
    postRoomSuccess,
    updateReservationByIdSuccess


} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
    hotels: getAllHotels,
    isLoading: isLoading,
    hotel: getHotelById,
    rooms: getRoomsByHotelId,
    refreshPage: refreshPage,
    errors: errors,
    reservationRooms: getReservationRoomsByUserLogin,
    deleteReservationByIdSuccess: deleteReservationByIdSuccess,
    reservation: getReservationByRoomId,
    allReservation:getAllReservationReducer,
    deleteRoomSuccess:deleteRoomSuccess,
    postRoomSuccess:postRoomSuccess,
    updateReservationByIdSuccess:updateReservationByIdSuccess

});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
