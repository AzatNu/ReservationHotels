const initialState = {
    updateRoleByIdSuccess: false,
};

export const updateRoleByIdSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_UPDATE_USER_ROLE_SUCCESS":
            return {
                ...state,
                updateRoleByIdSuccess: action.updateRoleByIdSuccess,
            };
        default:
            return state;
    }
};
