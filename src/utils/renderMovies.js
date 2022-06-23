import { calcTime } from "./constants";
import MoviesCard from "../components/MoviesCard/MoviesCard";

const sortKeyMovies = (movies, keyword) =>
    movies
        ? movies.filter((movie) => {
              const { nameRU: name } = { ...movie };
              return name.toLowerCase().includes(keyword.toLowerCase());
          })
        : "";

const sortShortMovies = (movies) =>
    movies ? movies.filter((movie) => movie.duration <= 40) : "";

const renderMovies = (
    movies,
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies
) =>
    movies
        ? movies.map((movie) => {
              return (
                  <MoviesCard
                      key={movie.id ?? movie._id}
                      movie={
                          movie.movieId
                              ? movie
                              : { movieId: movie.id, ...movie }
                      }
                      duration={calcTime(movie.duration)}
                      handleSaveMovie={handleSaveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      isSave={
                          Array.isArray(savedMovies) && savedMovies.length !== 0
                              ? savedMovies.some(
                                    (savedMovie) =>
                                        savedMovie.movieId ===
                                        (movie.id || movie.movieId)
                                )
                              : false
                      }
                  />
              );
          })
        : null;

export { renderMovies, sortKeyMovies, sortShortMovies };
