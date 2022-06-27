import { calcTime, SHORTDURATION } from "./constants";
import MoviesCard from "../components/MoviesCard/MoviesCard";

const sortKeyMovies = (movies, keyword) =>
    Array.isArray(movies) && movies.length !== 0 && keyword !== ""
        ? movies.filter((movie) => {
              const { nameRU: name } = { ...movie };
              return name.toLowerCase().includes(keyword.toLowerCase());
          })
        : [];

const sortShortMovies = (movies) =>
    Array.isArray(movies) && movies.length !== 0
        ? movies.filter((movie) => movie.duration <= SHORTDURATION)
        : [];

const renderMovies = (
    movies,
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies
) =>
    Array.isArray(movies) && movies.length !== 0
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
