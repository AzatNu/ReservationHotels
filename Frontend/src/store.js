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
    getReservation,
    getReservationRoomsByUserLogin,
    deleteReservationByIdSuccess,
    getAllReservationReducer,
    deleteRoomSuccess,
    postRoomSuccess,
    updateReservationByIdSuccess,
    getAllUsersSuccess,
    deleteUserByIdSuccess,
    updateRoleByIdSuccess
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
    reservation: getReservation,
    allReservation: getAllReservationReducer,
    deleteRoomSuccess: deleteRoomSuccess,
    postRoomSuccess: postRoomSuccess,
    updateReservationByIdSuccess: updateReservationByIdSuccess,
    allUsers: getAllUsersSuccess,
    deleteUserByIdSuccess: deleteUserByIdSuccess,
    updateUserRoleByIdSuccess: updateRoleByIdSuccess,
});
export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
