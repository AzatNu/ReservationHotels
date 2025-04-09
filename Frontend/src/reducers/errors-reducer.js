const initialState = {
    error: null,
};

export const errors = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};
