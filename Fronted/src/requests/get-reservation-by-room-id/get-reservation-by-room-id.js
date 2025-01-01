export const getReservationByRoomId = (roomId) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/reservations`   , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const reservation = await response.json();
        dispatch({ type: "SET_RESERVATION_BY_ROOM_ID_SUCCESS", reservationByRoomId: reservation });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};
