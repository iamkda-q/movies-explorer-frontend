import { useState } from "react";
import "./RegInput.css";
import { profilePlaceholders } from "../../utils/constants";


function RegInput({ value, label, type}) {

    const [inputValue, setInputValue] = useState(value);


    function handleChangeValue(evt) {
        setInputValue(evt.target.value);
    }
    return (
        <div className="reg-input__form-group">
            <label className="reg-input__label">{label}</label>
            <input
                type={type}
                className="reg-input__input"
                autoComplete="off"
                value={inputValue}
                onChange={handleChangeValue}
                placeholder={profilePlaceholders[type]}
                required
            />
            <span className="reg-input__error hidden">Что-то пошло не так...</span>
        </div>
    );
}

export default RegInput;
