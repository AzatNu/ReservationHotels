
import { request } from "../../App/utils";

export const getHotelAndRoomsAndReservation = (hotelId) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    try {
        const [hotelResponse, roomsResponse, reservationResponse] = await Promise.all([
            request(`/hotels/${hotelId}`),
            request(`/rooms`),
            request(`/reservations`)
        ]);
        const filteredRooms = roomsResponse.data.filter(room => room.hotel_id === hotelId);
        dispatch({ type: "SET_HOTEL_BY_ID_SUCCESS", hotel: hotelResponse });
        dispatch({ type: "SET_ROOMS_BY_HOTEL_ID_SUCCESS", rooms: filteredRooms });
        dispatch({ type: "SET_RESERVATION_SUCCESS", reservation: reservationResponse });
    } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};
