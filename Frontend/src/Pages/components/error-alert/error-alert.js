import errorAlertStyle from "./error-alert.module.css";
export const ErrorAlert = ({ children }) => {
    return (
        <span className={errorAlertStyle["errorAlertStyle"]}>
            {children}
        </span>
    );
};
