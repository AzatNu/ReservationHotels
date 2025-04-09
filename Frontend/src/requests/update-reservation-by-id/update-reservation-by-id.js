import { request } from "../../App/utils";
export const updateReservationById = (id, newStartDate, newEndDate) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    request(`/reservations/${id}`, "PATCH",
        {
            start_date: newStartDate,
            end_date: newEndDate
        }
    ).then(() => {
        dispatch({ type: "SET_UPDATE_RESERVATION_BY_ID_SUCCESS", updateReservationByIdSuccess: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        })
        .finally(() => {
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });
        });
}
