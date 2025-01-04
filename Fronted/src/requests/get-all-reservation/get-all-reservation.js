export const getAllReservation = () => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/reservations`);
        const reservations = await response.json();
        dispatch({ type: "SET_ALL_RESERVATIONS_SUCCESS", allReservation: reservations });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

