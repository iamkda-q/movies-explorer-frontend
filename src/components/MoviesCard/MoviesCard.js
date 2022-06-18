// import { Route } from "react-router-dom";
import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ image, name, duration, saveFilm }) {

    const saveClick = () => {
        saveFilm(name);
    }
    
    return (
        <div className="movies__movie">
            <img src={image} alt={`Заставка фильма "${name}"`} className="movies__img" />
            <div className="movies__info">
                <p className="movies__name">{name}</p>
                <span className="movies__duration">{duration}</span>
            </div>
            <button className="movies__delete"></button>
            <Route path="/movies" exact>
                <button className="movies__save app__link-button-type"
                onClick={saveClick}>
                    Сохранить
                </button>
            </Route>
        </div>
    );
}

export default MoviesCard;
