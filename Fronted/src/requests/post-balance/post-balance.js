
export const postBalance = (userId, newBalance, balance) => (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    fetch(`http://localhost:3005/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            balance: Number(balance) + Number(newBalance),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch({ type: "SET_NEW_BALANCE", newBalance: data.balance });
            localStorage.setItem("balance", data.balance);
        })
        .catch((error) => {
            dispatch({ type: "SET_ERROR", error: error.message });
        })
        .finally(() => {
            dispatch({ type: "SET_IS_LOADING", isLoading: false });
        });
};
