import { toast } from "react-toastify";

export const SuccessToast = (message) => {
    return toast.success(message, {
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
            backgroundColor: "#3DD9EB",
            color: "#0a0a0a",
            marginBottom: "130px",
        },
    });
};

