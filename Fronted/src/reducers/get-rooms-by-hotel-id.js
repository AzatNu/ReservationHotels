const initialState = {
    rooms: [],
};

export const getRoomsByHotelId = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ROOMS_BY_HOTEL_ID_SUCCESS":
            return {
                ...state,
                rooms: action.rooms,
            };
        default:
            return state;
    }
};
