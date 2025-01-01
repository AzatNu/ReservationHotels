

export const getReservationRoomsByUserLogin = (userLogin) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/reservations?user=${userLogin}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const rooms = await response.json();
        dispatch({ type: "SET_RESERVATION_ROOMS_BY_USER_LOGIN_SUCCESS", rooms: rooms });
        dispatch({ type: "SET_ERROR", error: null });
    } catch (error) {
        dispatch({ type: "SET_ERROR", errors: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

