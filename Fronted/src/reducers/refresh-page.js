const initialState = {
    refreshPage: false,
};
export const refreshPage = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REFRESH_PAGE":
            return {
                ...state,
                refreshPage: action.refreshPage,
            };
        default:
            return state;
    }
}
