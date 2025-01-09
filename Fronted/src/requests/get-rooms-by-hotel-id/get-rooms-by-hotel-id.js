import { request } from "../../App/utils";
export const getRoomsByHotelId = (hotelId) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const response = await request(`/rooms`);
        const filteredRooms = response?.data.filter(room => room.hotel_id === hotelId);
        dispatch({ type: "SET_ROOMS_BY_HOTEL_ID_SUCCESS", rooms: filteredRooms });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};

