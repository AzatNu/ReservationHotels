const initialState = {
    hotels: [],
};


export const getAllHotels = (state = initialState, action) => {
    switch (action.type) {
        case "SET_HOTELS_SUCCESS":
            return {
                ...state,
                hotels: action.posts,
            };
        default:
            return state;
    }
};
