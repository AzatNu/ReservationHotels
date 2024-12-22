
export const getAllHotels = () => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await fetch("http://localhost:3005/hotels");
        dispatch({
            type: "SET_HOTELS_SUCCESS",
            posts: await response.json(),
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
        