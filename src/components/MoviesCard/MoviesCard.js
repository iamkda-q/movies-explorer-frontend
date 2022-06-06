// import { Route } from "react-router-dom";
import "./MoviesCard.css";
import image from "../../assets/images/1.png";

function MoviesCard() {
    return (
        <div className="movies__movie">
            <img src={image} alt="" className="movies__img" />
            <div className="movies__info">
                <p className="movies__name">33 слова о дизайне</p>
                <span className="movies__duration">1ч 17м</span>
            </div>
            <button className="movies__saved"></button>
            <button className="movies__save">Сохранить</button>
        </div>
    )
}

export default MoviesCard;
