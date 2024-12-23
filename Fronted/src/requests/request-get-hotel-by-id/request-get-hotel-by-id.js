export const getHotelById = (id) => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await fetch(`http://localhost:3005/hotels/${id}`);
        dispatch({
            type: "SET_HOTEL_BY_ID_SUCCESS",
            hotel:  await response.json(),
        });
    } catch (error) {
        console.error("Failed to fetch posts", error);
    }
    finally {
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        });
    }
};

