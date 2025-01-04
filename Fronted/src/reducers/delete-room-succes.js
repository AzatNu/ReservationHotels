const initialState = {
    deleteRoomSuccess: false,
};
export const deleteRoomSuccess = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DELETE_ROOM_SUCCESS":
            return {
                ...state,
                deleteRoomSuccess: action.deleteRoomSuccess,
            };
        default:
            return state;
    }
}
