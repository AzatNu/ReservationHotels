import { request } from "../../App/utils";
export const getHotelById = (id) => async (dispatch) => {
    dispatch({
        type: "SET_IS_LOADING",
        isLoading: true
    });
    try {
        const response = await request(`/hotels/${id}`);
        dispatch({
            type: "SET_HOTEL_BY_ID_SUCCESS",
            hotel: await response
        });
        dispatch({ type: "SET_IS_LOADING", isLoading: false });
    } catch (error) {
        dispatch({
            type: "SET_ERROR",
            error: error
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

