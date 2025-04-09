const initialState = {
    deleteUserByIdSuccess: false,
};

export const deleteUserByIdSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DELETE_USER_BY_ID_SUCCESS":
            return {
                ...state,
                deleteUserByIdSuccess: action.deleteUserByIdSuccess,
            };
        default:
            return state;
    }
}
