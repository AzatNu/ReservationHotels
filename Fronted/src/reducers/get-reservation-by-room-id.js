const initialState = {
    reservation: [],
};
export const getReservation = (state = initialState, action) => {
    switch (action.type) {
        case "SET_RESERVATION_SUCCESS":
            return {
                ...state,
                reservation: action.reservation,
            };
        default:
            return state;
    }
}
