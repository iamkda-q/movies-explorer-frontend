import React from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import Logo from "../Logo/Logo";
import Account from "../Account/Account";

import "./Header.css";

function Header({ loggedIn, showBurger }) {
    const { path } = useRouteMatch();

    return (
        <header className={`header ${path === "/" ? "header_land" : ""}`}>
            <div className="header__container app__position">
                <Logo />
                {loggedIn && (
                    <Route
                        path={["/movies", "/saved-movies", "/profile", "/"]}
                        exact
                    >
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
                        <div
                            className="header__burger-icon"
                            onClick={showBurger}
                        >
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <Link
                            to="/profile"
                            className="header__link app__link-button-type"
                        >
                            <Account />
                        </Link>
                    </Route>
                )}

                {loggedIn || (
                    <Route path="/" exact>
                        <div className="header__regs">
                            <Link
                                to="/signup"
                                className="header__link header__link_landing app__link"
                            >
                                Регистрация
                            </Link>
                            <Link
                                to="/signin"
                                className="header__link header__link_landing
                        header__link_button-type app__link-button-type"
                            >
                                Войти
                            </Link>
                        </div>
                    </Route>
                )}
            </div>
        </header>
    );
}

export default Header;
