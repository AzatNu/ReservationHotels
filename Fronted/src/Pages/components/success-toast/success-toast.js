import { toast } from "react-toastify";

export const SuccessToast = (message) => {
    const isMobile = window.innerWidth <= 768;

    const toastStyle = {
        fontSize: "1.5rem",
        minWidth: "600px",
        color: "#0a0a0a",
        marginBottom: "150px",
    };

    if (isMobile) {
        toastStyle.fontSize = "1rem";
        toastStyle.minWidth = "auto";
        toastStyle.width = "350px";
        toastStyle.marginBottom = "70px";
        toastStyle.marginLeft = "30px";
    }

    return toast.success(message, {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: toastStyle,
    });
};

