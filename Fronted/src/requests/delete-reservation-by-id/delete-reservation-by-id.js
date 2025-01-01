
import { postBalance } from "../../requests";
export const deleteReservationById = (roomId, roomPrice, balance,userId) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/reservations/${roomId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            dispatch({ type: "SET_DELETE_RESERVATION_BY_ID_SUCCESS", deleteReservationByIdSuccess: true });
            dispatch( postBalance(userId, roomPrice, balance));
        }
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });

    }
};

