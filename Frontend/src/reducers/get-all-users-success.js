const initialState = {
    allUsers: [],
};

export const getAllUsersSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_USERS_SUCCESS":
            return {
                ...state,
                allUsers: action.allUsers,
            };
        default:
            return state;
    }
}
