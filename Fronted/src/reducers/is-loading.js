const initialState = {
    isLoading: false,
};

export const isLoading = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};
