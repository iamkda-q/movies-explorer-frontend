import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Main.css";
import Preview from "../Preview/Preview";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../More/More";
import SavedDivider from "../SavedDivider/SavedDivider";
import Burger from "../Burger/Burger";
import getMovies from "../../utils/MovieApi";
import renderMovies from "../../utils/renderMovies";

function Main({ isBurgerOpen, showBurger }) {
    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [shorts, setShorts] = React.useState(false);

    const changeShorts = () => {
        setShorts(!shorts);
    };

    const handleSubmitMovies = async () => {
        const moviesData = await getMovies();
        console.log(moviesData);
        setMovies(moviesData.slice(30, 36));
    };

    const saveFilm = (name) => {
        console.log(name);
    };

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Preview />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                </Route>
                <Route path="/movies">
                    <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
                    <SearchForm
                        handleSubmit={handleSubmitMovies}
                        shorts={shorts}
                        changeShorts={changeShorts}
                    />
                    <MoviesCardList>
                        {renderMovies(movies, shorts, saveFilm)}
                    </MoviesCardList>
                    <More />
                </Route>
                <Route path="/saved-movies">
                    <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
                    <SearchForm />
                    <MoviesCardList>
                        {renderMovies(savedMovies, shorts, saveFilm)}
                    </MoviesCardList>
                    <SavedDivider />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;
