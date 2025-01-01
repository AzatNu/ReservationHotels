import { generateRandomCode } from "../../App/utils/generate-random-code.js";
export const patchReserveRoom = (roomId, startDate, endDate, user, reservationPrice, peoples, number, description, type, hotelName, hotelAdress) => (dispatch) => {
    const code = generateRandomCode();
    console.log(hotelAdress, hotelName);
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            room_id: roomId,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            user: user,
            code: code,
            peoples: peoples,
            number: number,
            price: reservationPrice,
            description: description,
            type: type,
            hotel_name: hotelName,
            hotel_adress: hotelAdress
        }),
    })

        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
        })
        .finally(() => {
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: true });
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
            dispatch({ type: "SET_REFRESH_PAGE", refreshPage: false });
        });

};

