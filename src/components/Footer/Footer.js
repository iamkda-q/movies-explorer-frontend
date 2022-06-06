import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer app__position">
            <p className="footer__sponsors">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
                <address className="footer__copyright">
                    &copy; 2022. Коннов Дмитрий
                </address>
                <nav>
                    <ul className="footer__nav">
                        <li>
                            <a className="footer__link app__link" href="https://practicum.yandex.ru/" target="blank">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li>
                            <a className="footer__link app__link" href="https://github.com/iamkda-q" target="blank">Github</a>
                        </li>
                        <li>
                            <a className="footer__link app__link" href="https://vk.com/id107695180" target="blank">VK</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
