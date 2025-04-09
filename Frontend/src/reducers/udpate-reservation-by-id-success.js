const initialState = {
    updateReservationByIdSuccess: false,
}
export const updateReservationByIdSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_UPDATE_RESERVATION_BY_ID_SUCCESS":
            return {
                ...state,
                updateReservationByIdSuccess: action.updateReservationByIdSuccess,
            };
        default:
            return state;
    }
}
