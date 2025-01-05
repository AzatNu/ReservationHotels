export const deleteUserById = (id) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        dispatch({ type: "SET_DELETE_USER_BY_ID_SUCCESS", deleteUserByIdSuccess: true });
    })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
        })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        });
}
