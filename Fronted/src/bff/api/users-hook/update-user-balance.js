export const updateUserBalance = (userId, newBalance) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            balance: newBalance,
        }),
    }).catch((error) => {
        dispatch({ type: "SET_ERROR", error: error.message });
    })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        });

};
