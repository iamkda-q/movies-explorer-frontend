import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <address className="footer__sponsors">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </address>
            <div className="footer__info">
                <p className="footer__copyright">
                    &copy; 2022. Коннов Дмитрий
                </p>
                <nav>
                    <ul className="footer__nav">
                        <li>
                            <Link className="footer__link" to="/">
                                Яндекс.Практикум
                            </Link>
                        </li>
                        <li>
                            <p className="footer__link" to="/">Github</p>
                        </li>
                        <li>
                            <Link className="footer__link" to="/">Facebook</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
