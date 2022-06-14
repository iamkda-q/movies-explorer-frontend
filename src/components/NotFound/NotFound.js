import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <span className="not-found__subtitle">Страница не найдена</span>
            <Link to="/" className="not-found__back app__link">Назад</Link>
        </section>
    );
}

export default NotFound;
