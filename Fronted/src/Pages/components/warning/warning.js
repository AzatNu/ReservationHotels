import warningStyle from "./warning.module.css";
export const Warning = ({ children, style }) => {
    return (
        <h1 className={warningStyle["warningStyle"]} style={style}>
            {children}
        </h1>
    );
};
