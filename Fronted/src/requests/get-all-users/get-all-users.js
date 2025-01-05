export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await fetch(`http://localhost:3005/users`);
        const users = await response.json();
        dispatch({ type: "SET_ALL_USERS_SUCCESS", allUsers: users });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

