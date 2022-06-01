import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                  <div>
                    <div></div>
                  </div>
                </div>
                <Link to="/sign-up" className="header__link">
                    Регистрация
                </Link>
                <Link to="/sign-in" className="header__link header__link_button-type">
                    Войти
                </Link>
            </div>
        </header>
    );
}

export default Header;
