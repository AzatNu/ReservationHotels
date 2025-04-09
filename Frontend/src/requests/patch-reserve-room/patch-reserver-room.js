import { generateRandomCode } from "../../App/utils/generate-random-code.js";
import { request } from "../../App/utils";
export const postReserveRoom = (roomId, startDate, endDate, user, reservationPrice, peoples, number, description, type, hotelName, hotelAdress) => (dispatch) => {
    const code = generateRandomCode();
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    request(`/reservations`, "POST", {
        room_id: roomId,
        start_date: startDate,
        end_date: endDate,
        user: user,
        code: code,
        peoples: peoples,
        number: number,
        price: reservationPrice,
        description: description,
        type: type,
        hotel_name: hotelName,
        hotel_adress: hotelAdress
    },
    )
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        })
        .finally(() => {
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });
        });
};

