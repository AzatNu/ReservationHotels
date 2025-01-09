import { request } from "../../App/utils";
export const updateUserRoleById = (id, role) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    request(`users/${id}`,
        "PATCH",
        { role_id: role, }
    )
        .then(() => {
            dispatch({ type: "SET_UPDATE_USER_ROLE_SUCCESS", updateRoleByIdSuccess: true });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
        });
}

