import React from "react";
import { Route, Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import icon from "../../assets/images/account-icon.svg";

function Header({loggedIn}) {
    return (
        <header className={`header ${document.location.pathname === "/" ? "header_land" : ""}`}>
            <div className="header__container app__position">
                <Logo />
                <Route path={["/movies", "/saved-movies", "/profile"]} exact>
                    <div className="header__movies">
                        <Link
                            to="/movies"
                            className="header__link header__link_movie app__link"
                        >
                            Фильмы
                        </Link>
                        <Link
                            to="/saved-movies"
                            className="header__link header__link_movie app__link"
                        >
                            Сохранённые фильмы
                        </Link>
                    </div>
                    <Link
                        to="/profile"
                        className="header__account app__link-button-type"
                    >
                        <p className="header__account-txt">Аккаунт</p>
                        <div>
                            <img
                                src={icon}
                                alt="Иконка логина"
                                className="header__account-icon"
                            />
                        </div>
                    </Link>
                </Route>
                <Route path="/" exact>
                    <div className="header__regs">
                        <Link to="/signup" className="header__link app__link">
                            Регистрация
                        </Link>
                        <Link
                            to="/signin"
                            className="header__link 
                        header__link_button-type app__link-button-type"
                        >
                            Войти
                        </Link>
                    </div>
                </Route>
            </div>
        </header>
    );
}

export default Header;
