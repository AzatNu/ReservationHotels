const initialState = {
    reservationByRoomId: [],
};
export const getReservationByRoomId = (state = initialState, action) => {
    switch (action.type) {
        case "SET_RESERVATION_BY_ROOM_ID_SUCCESS":
            return {
                ...state,
                reservationByRoomId: action.reservationByRoomId,
            };
        default:
            return state;
    }
}
