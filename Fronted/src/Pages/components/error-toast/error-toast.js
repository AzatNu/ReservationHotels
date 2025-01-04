import { toast } from "react-toastify";


export const ErrorToast = (message) => {
    return toast.error(message, {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
            fontSize: "2rem",
            minWidth: "600px",
            color: "#0a0a0a",
            marginBottom: "130px",
        },
    });
};

