import React from "react";
import { Link } from "react-router-dom";
import "./RegButton.css";

function RegButton({
    buttonText,
    spanText,
    link,
    linkText,
    errorText = "При регистрации произошла ошибка",
}) {
    return (
        <div className="reg-button">
            <span className="reg-button__error hidden">{errorText}</span>
            <button
                type="submit"
                className="reg-button__button app__link-button-type"
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
