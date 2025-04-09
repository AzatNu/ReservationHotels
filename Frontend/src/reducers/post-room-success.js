const initialState = {
    postRoomSuccess: false,
};
export const postRoomSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POST_ROOM_SUCCESS":
            return {
                ...state,
                postRoomSuccess: action.postRoomSuccess,
            };
        default:
            return state;
    }
}
