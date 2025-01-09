import { request } from "../../App/utils";
export const deleteUserById = (id) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        await request(`users/${id}`, "DELETE");
        dispatch({ type: "SET_DELETE_USER_BY_ID_SUCCESS", deleteUserByIdSuccess: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } finally {
        dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

