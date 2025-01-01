const initialState = {
    roomsByUserLogin: [],

};

export const getReservationRoomsByUserLogin = (state = initialState, action) => {
    switch (action.type) {

        case "SET_RESERVATION_ROOMS_BY_USER_LOGIN_SUCCESS":
            return {
                ...state,
                roomsByUserLogin: action.rooms,
            }
        default:
            return state;
    }
}

