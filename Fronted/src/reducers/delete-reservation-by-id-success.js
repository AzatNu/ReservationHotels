
const initialState = {
    deleteReservationByIdSuccess: false
};

export const deleteReservationByIdSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DELETE_RESERVATION_BY_ID_SUCCESS":
            return {
                ...state,
                deleteReservationByIdSuccess: action.deleteReservationByIdSuccess,
            };

        default:
            return state;
    }
};
