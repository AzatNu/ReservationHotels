import { request } from "../../App/utils";
export const deleteRoom = (id) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        await request(`/rooms/${id}`, "DELETE");
        dispatch({ type: "SET_DELETE_ROOM_SUCCESS", deleteRoomSuccess: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });
    }
}

