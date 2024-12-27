import { generateRandomCode } from "../../App/utils/generate-random-code.js";
export const patchReserveRoom = (roomId, startDate, endDate, user) => (dispatch) => {
    const code = generateRandomCode();
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/rooms/${roomId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            reservation: [
                {
                    start: startDate,
                    end: endDate,
                    user,
                    code: code
                },
            ],
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

