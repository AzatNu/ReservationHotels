
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
        dispatch({
            type: "SET_ERROR",
            error
        })
    }
    finally {
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        });
    }
};
