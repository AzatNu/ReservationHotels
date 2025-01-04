const initialState = {
    allReservation: [],
};
export const getAllReservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_RESERVATIONS_SUCCESS":
            return {
                ...state,
                allReservation: action.allReservation,
            };
        default:
            return state;
    }
};

