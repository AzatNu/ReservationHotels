import pageTitleStyle from "./page-title.module.css";
export const PageTitle = ({ children }) => {
    return (
        <div className={pageTitleStyle["pageTitle"]}>
            {children}
        </div>
    );
};



