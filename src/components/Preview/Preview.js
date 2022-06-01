import previewPattern from "../../assets/images/previewPattern.svg";
import "./Preview.css"

function Preview() {
  return (
    <section className="preview">
      <div className="preview__container">
        <h1 className="preview__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img src={previewPattern} alt="Встречающий посетителя узор" className="preview__pattern" />
      </div>
    </section>
  );
}

export default Preview;