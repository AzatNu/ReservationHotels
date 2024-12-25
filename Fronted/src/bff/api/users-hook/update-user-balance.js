export const updateUserBalance = (userId, newBalance) => (dispatch) => {
    fetch(`http://localhost:3005/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            balance: newBalance,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

};
