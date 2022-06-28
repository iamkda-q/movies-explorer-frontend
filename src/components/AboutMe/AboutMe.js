import { Link } from "react-router-dom";
import "./AboutMe.css";
import photo from "../../assets/images/photo.jpg";
import MainTitle from "../MainTitle/MainTitle";

function AboutMe() {
    return (
        <section className="about-me app__position">
            <MainTitle text="Студент" />
            <div className="about-me__info">
                <div className="about-me__text-cont">
                    <h2 className="about-me__name">Дмитрий</h2>
                    <p className="about-me__prof">
                        Инженер&#8209;электротехник (по ночам в тайне от всех
                        фронтенд&#8209;разработчик), 25 лет
                    </p>
                    <p className="about-me__about">
                        Я родился в Дзержинске, после школы переехал учиться в
                        Москву, закончил кафедру автоматизированного
                        электропривода Московского энергетического института. В
                        настоящее время работаю по образованию инженером в
                        небольшой фирме. Кодил ещё в институте на C++ по учёбе,
                        Web-кодингом начал заниматься с сентября 2021 года.
                        Коммерческого опыта, как веб-разработчик, не имею, но
                        очень стремлюсь к этому.
                    </p>
                    <a
                        className="about-me__link app__link"
                        href="https://vk.com/id107695180"
                        target="blank"
                    >
                        VK
                    </a>
                    <a
                        className="about-me__link app__link"
                        href="https://github.com/iamkda-q"
                        target="blank"
                    >
                        Github
                    </a>
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
                    <a
                        className="about-me__project-link app__link"
                        href="https://iamkda-q.github.io/virtual-keyboard/"
                        target="blank"
                    >
                        <p>Статичный сайт</p>
                        <div className="about-me__link-icon"></div>
                    </a>
                </li>
                <li className="about-me__project">
                    <a
                        className="about-me__project-link app__link"
                        href="https://rolling-scopes-school.github.io/iamkda-q-JSFE2022Q1/shelter/main/"
                        target="blank"
                    >
                        <p>Адаптивный сайт</p>
                        <div className="about-me__link-icon"></div>
                    </a>
                </li>
                <li className="about-me__project">
                    <Link
                        className="about-me__project-link app__link"
                        to="/movies"
                    >
                        <p>Одностраничное приложение</p>
                        <div className="about-me__link-icon"></div>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default AboutMe;
