import { request } from "../../App/utils";


export const postRoom = (hotel, number, type, price, descriptionm, images) => async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    let hotelId = "";
    if (hotel === "Бристоль") {
        hotelId = "677ad05385223cdd1eb851bf"
    } else if (hotel === "Европа") {
        hotelId = "677ad0a485223cdd1eb851c1"
    }
    try {
        await request("/rooms", "POST", {
            hotel_id: hotelId,
            number: number,
            type: type,
            price: price,
            description: descriptionm,
            images: images
        });
        dispatch({ type: "SET_POST_ROOM_SUCCESS", postRoomSuccess: true });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
        dispatch({ type: "SET_ERROR", error: error.message });
    } finally {
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
};
