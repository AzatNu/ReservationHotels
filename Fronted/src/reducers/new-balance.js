const initialState = {
    newBalance: 0
};

export const newBalance = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NEW_BALANCE":
            return {
                ...state,
                newBalance: action.newBalance,
            };
        default:
            return state;
    }
};
