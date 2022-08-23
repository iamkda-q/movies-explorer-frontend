import React from "react";
import { Link } from "react-router-dom";
import "./RegButton.css";

function RegButton({
    buttonText,
    spanText,
    link,
    linkText,
    isError = false,
    errorText = "При регистрации произошла ошибка",
    isDisabled,
}) {
    return (
        <div className="reg-button">
            <span
                className={`reg-button__error ${
                    isError ? "" : "reg-button__error_hidden"
                }`}
            >
                {errorText}
            </span>
            <button
                type="submit"
                className={`reg-button__button app__link-button-type ${ isDisabled ? "reg-button__button_disable" : ""}`}
            >
                {buttonText}
            </button>
            <span className="reg-button__text">
                {spanText}&nbsp;
                <Link to={link} className="reg-button__link app__link">
                    {linkText}
                </Link>
            </span>
        </div>
    );
}

export default RegButton;
