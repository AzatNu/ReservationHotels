import { request } from "../../App/utils";
export const deleteReservationById = (id) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        request(`/reservations/${id}`, "DELETE");
        dispatch({ type: "SET_DELETE_RESERVATION_BY_ID_SUCCESS", deleteReservationByIdSuccess: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } finally {
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });
    }
};

