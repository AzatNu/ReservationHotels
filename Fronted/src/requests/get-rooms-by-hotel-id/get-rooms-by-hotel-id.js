export const getRoomsByHotelId = (hotelId) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/rooms?hotel_id=${hotelId}`);
        const rooms = await response.json();

        dispatch({ type: "SET_ROOMS_BY_HOTEL_ID_SUCCESS", rooms: rooms });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

