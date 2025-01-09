import { request } from "../../App/utils";
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await request(`/users`);
        const users = await response
        dispatch({ type: "SET_ALL_USERS_SUCCESS", allUsers: users });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

