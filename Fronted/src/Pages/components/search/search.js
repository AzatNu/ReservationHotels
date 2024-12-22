import searchStyle from "./search.module.css";
export const Search = ({ placeholder, buttonTitle}) => {
    return (
        <div className={searchStyle["searchContainer"]}>
            <input className={searchStyle["searchInput"]} type="text" placeholder={placeholder} />
            <button className={searchStyle["searchButton"]}title={buttonTitle} ></button>
        </div>
    );
}
