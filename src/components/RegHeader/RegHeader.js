import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./RegHeader.css";

function RegHeader() {
    return (
        <header className="reg-header">
            <Logo />
            <h1 className="reg-header__title">Добро пожаловать!</h1>
        </header>
    );
}

export default RegHeader;
