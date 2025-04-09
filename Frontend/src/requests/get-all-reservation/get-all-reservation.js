import { request } from "../../App/utils";

export const getAllReservation = () => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await request(`/reservations`);
        const reservations = await response
        dispatch({ type: "SET_ALL_RESERVATIONS_SUCCESS", allReservation: reservations });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

