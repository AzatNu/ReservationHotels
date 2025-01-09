import { request } from "../../App/utils";
export const getReservation = () => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await request(`/reservations`);
        const reservation = await response
        dispatch({ type: "SET_RESERVATION_SUCCESS", reservation: reservation });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};
