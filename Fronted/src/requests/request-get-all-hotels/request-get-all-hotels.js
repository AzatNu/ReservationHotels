import { request } from "../../App/utils";
export const getAllHotels = () => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await request("/hotels");
        dispatch({
            type: "SET_HOTELS_SUCCESS",
            posts: await response
        });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({
            type: "SET_ERROR",
            error
        })
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    }
    finally {
        dispatch({
            type: "SET_IS_LOADING",
            isLoading: false
        });
    }
};
