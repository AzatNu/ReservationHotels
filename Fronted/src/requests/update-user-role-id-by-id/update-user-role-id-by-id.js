export const updateUserRoleById = (id, role) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            role_id: role,
        }),
    })
        .then(() => {
            dispatch({ type: "SET_UPDATE_USER_ROLE_SUCCESS", updateRoleByIdSuccess: true });
        })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
        })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        });
}

