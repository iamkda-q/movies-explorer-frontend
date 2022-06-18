import { calcTime } from "./constants";
import MoviesCard from "../components/MoviesCard/MoviesCard";

function renderMovies(movies, shorts, saveFilm) {
    return movies
        ? shorts
            ? movies
                  .filter((movie) => movie.duration <= 40)
                  .map((movie) => (
                      <MoviesCard
                          key={movie.id}
                          image={movie.image.url}
                          name={movie.nameRU}
                          duration={calcTime(movie.duration)}
                          saveFilm={saveFilm}
                      />
                  ))
            : movies.map((movie) => (
                  <MoviesCard
                      key={movie.id}
                      image={movie.image.url}
                      name={movie.nameRU}
                      duration={calcTime(movie.duration)}
                      saveFilm={saveFilm}
                  />
              ))
        : null;
}

export default renderMovies;
