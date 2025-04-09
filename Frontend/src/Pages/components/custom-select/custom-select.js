
import customSelectStyle from "./custom-select.module.css";
import Select from "react-select";

export const CustomSelect = ({ options, onChange, value }) => {
    return (
        <div className={customSelectStyle["customSelectContainer"]}>
            <Select
                className={customSelectStyle["customSelect"]}
                options={options}
                onChange={onChange}
                value={options.find(option => option.value === value)}
                defaultValue={options[0]}
            />
        </div>
    );
};



