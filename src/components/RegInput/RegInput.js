import { useState } from "react";
import "./RegInput.css";
import { profilePlaceholders } from "../../utils/constants";


function RegInput({ value, label, type, onChange, name, isError, errorText}) {
    return (
        <div className="reg-input__form-group">
            <label className="reg-input__label">{label}</label>
            <input
                type={type}
                className="reg-input__input"
                autoComplete="off"
                value={value}
                onChange={onChange}
                placeholder={profilePlaceholders[type]}
                name={name}
                required
            />
            <span className={`reg-input__error ${isError ? "": "reg-input__error_hidden"}`}>{errorText}</span>
        </div>
    );
}

export default RegInput;
