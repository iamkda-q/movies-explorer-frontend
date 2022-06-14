import "./AboutProject.css";
import MainTitle from "../MainTitle/MainTitle";

function AboutProject() {
  return (
    <section className="about-project app__position">
        <MainTitle text="О проекте" />
        <div className="about-project__info">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__stages">
            <p className="about-project__stage about-project__stage_back">1 неделя</p>
            <p className="about-project__stage about-project__stage_front">4 недели</p>
            <p className="about-project__stage-text about-project__stage-text_grey">Back-end</p>
            <p className="about-project__stage-text about-project__stage-text_grey">Front-end</p>
        </div>
    </section>
  );
}

export default AboutProject;