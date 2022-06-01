import { Link } from "react-router-dom";
import "./AboutMe.css";
import photo from "../../assets/images/photo.jpg";
import MainTitle from "../MainTitle/MainTitle";

function AboutMe() {
    return (
        <section className="about-me">
            <MainTitle text="Студент" mrgBot={"66px"} />
            <div className="about-me__info">
                <div className="about-me__text">
                    <h2 className="about-me__name">Дмитрий</h2>
                    <p className="about-me__prof">
                        Инженер&#8209;электротехник (по ночам в тайне от всех
                        фронтенд&#8209;разработчик), 25 лет
                    </p>
                    <p className="about-me__about">
                        Я родился и живу в Саратове, закончил факультет
                        экономики СГУ. У меня есть жена и дочь. Я люблю слушать
                        музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
                        2015 года работал в компании «СКБ Контур». После того,
                        как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <Link className="about-me__link">VK</Link>
                    <Link className="about-me__link">Github</Link>
                </div>
                <img
                    src={photo}
                    alt="Студенческое фото"
                    className="about-me__avatar"
                />
            </div>
            <h3 className="about-me__portfolio">Портфолио</h3>
            <ul className="about-me__projects">
                <li className="about-me__project">
                    <Link className="about-me__project-link">
                        <p>Статичный сайт</p>
                        <div className="about-me__link-icon"></div>
                    </Link>
                </li>
                <li className="about-me__project">
                    <Link className="about-me__project-link">
                        <p>Адаптивный сайт</p>
                        <div className="about-me__link-icon"></div>
                    </Link>
                </li>
                <li className="about-me__project">
                    <Link className="about-me__project-link">
                        <p>Одностраничное приложение</p>
                        <div className="about-me__link-icon"></div>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default AboutMe;
