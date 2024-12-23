const initialState = {
    hotel: [] ,
};
export const getHotelById = (state = initialState, action) => {
    switch (action.type) {
        case "SET_HOTEL_BY_ID_SUCCESS":
            return {
                ...state,
                hotel: action.hotel,
            };
        default:
            return state;
    }
}
