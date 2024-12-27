export const getRoomsByHotelId = (hotelId) => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await fetch(`http://localhost:3005/rooms`);
        const rooms = await response.json();
        dispatch({
            type: "SET_ROOMS_BY_HOTEL_ID_SUCCESS",
            rooms: rooms.filter(room => room.hotel_id === hotelId && room.reservation.length === 0)
        });
    } catch (error) {
        dispatch({
            type: "SET_ERROR",
            error: error
        })
    } finally {
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        });
    }
};

