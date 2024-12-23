import searchStyle from "./search.module.css";
import reset from "../../../assets/hotel-id-icons/icons8-крестик-78.png";
export const Search = ({ placeholder, buttonTitle, value, onChange, onClickButton }) => {
    return (
        <div className={searchStyle["searchContainer"]}>
            <input className={searchStyle["searchInput"]} value={value} onChange={onChange} type="text" placeholder={placeholder} />
            <button className={searchStyle["searchButton"]} title={buttonTitle} onClick={onClickButton} ><img src={reset} alt="logo" /></button>
        </div>
    );
}
