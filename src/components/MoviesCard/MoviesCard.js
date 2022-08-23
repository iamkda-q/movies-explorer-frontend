// import { Route } from "react-router-dom";
import { useState } from "react";
import { Route } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({
    movie,
    duration,
    handleSaveMovie,
    handleDeleteMovie,
    isSave = false,
}) {
    const [isSending, setSending] = useState(false);
    const saveMovie = async (e) => {
        e.stopPropagation();
        setSending(true);
        try {
            await handleSaveMovie(movie);
        } catch (err) {
            console.log(err.message);
        } finally {
            setSending(false);
        }
    };

    const deleteMovie = async (e) => {
        e.stopPropagation();
        setSending(true);
        try {
            await handleDeleteMovie(movie.movieId);
        } catch (err) {
            console.log(err.message);
        } finally {
            setSending(false);
        }
    };

    const openTrailer = () => {
        window.open(movie.trailerLink) ;
    };

    return (
        <div className="movies__movie" onClick={openTrailer}>
            <img
                src={movie.image}
                alt={`Заставка фильма "${movie.nameRU}"`}
                className="movies__img"
            />
            <div className="movies__info">
                <p className="movies__name">{movie.nameRU}</p>
                <span className="movies__duration">{duration}</span>
            </div>
            {isSave ? (
                <button
                    className={`movies__delete ${isSending ? "movies__delete_disabled" : ""}`}
                    type="button"
                    onClick={deleteMovie}
                ></button>
            ) : null}
            <Route path="/movies" exact>
                {isSave ? null : (
                    <button
                        className={`movies__save app__link-button-type ${isSending ? "movies__save_disabled" : ""}`}
                        type="button"
                        onClick={saveMovie}
                    >
                        {isSending ? "Сохранение.." : "Сохранить"}
                    </button>
                )}
            </Route>
        </div>
    );
}

export default MoviesCard;
