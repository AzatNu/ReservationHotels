export const postRoom = (hotel, number, type, price, descriptionm, images) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    let hotelId = 1;
    if (hotel === "Бристоль") {
        hotelId = "1";
    } else if (hotel === "Europa") {
        hotelId = "2";
    }
    fetch("http://localhost:3005/rooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            hotel_id: hotelId,
            number: number,
            type: type,
            price: price,
            description: descriptionm,
            images: images
        }),

    }).then((res) => {
        dispatch({ type: "SET_POST_ROOM_SUCCESS", postRoomSuccess: true });
    })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
        })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        });
};
