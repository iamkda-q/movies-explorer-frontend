import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Burger.css";
import Account from "../Account/Account";


function Burger( {isOpen, showBurger}) {

    return (
        <section className={`burger ${isOpen ? "" : "burger_hidden"}`}>
            <nav>
                <ul className={`burger__container ${isOpen ? "" : "burger__container_hidden"}`}>
                    <li className="burger__item">
                        <NavLink
                            to="/"
                            title="Главная страница"
                            className="burger__link app__link"
                            activeClassName="burger__link_active"
                            exact
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className="burger__item">
                        <NavLink
                            to="/movies"
                            className="burger__link app__link"
                            title="Фильмы"
                            activeClassName="burger__link_active"
                        >
                            Фильмы
                        </NavLink>
                    </li>
                    <li className="burger__item">
                        <NavLink
                            to="/saved-movies"
                            className="burger__link app__link"
                            title="Сохранённые фильмы"
                            activeClassName="burger__link_active"
                        >
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                    <li className="burger__item">
                        <Link
                            to="/profile"
                            className="burger__link app__link"
                        >
                            <Account />
                        </Link>
                    </li>
                </ul>
                <button
                    type="button"
                    className="burger__close app__link-button-type"
                    onClick={showBurger}
                ></button>
            </nav>
        </section>
    );
}

export default Burger;
