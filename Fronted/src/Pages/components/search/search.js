import searchStyle from "./search.module.css";
export const Search = ({
    placeholder,
    buttonTitle,
    value,
    onChange,
    onClickButton,
}) => (
    <div className={searchStyle["searchContainer"]}>
        <input
            className={searchStyle["searchInput"]}
            value={value}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
        />
        <button
            className={searchStyle["searchButton"]}
            title={buttonTitle}
            onClick={onClickButton}
        >
            ✖
        </button>
    </div>
);

