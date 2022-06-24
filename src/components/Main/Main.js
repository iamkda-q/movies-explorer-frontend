import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./Main.css";
import Preview from "../Preview/Preview";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import SavedDivider from "../SavedDivider/SavedDivider";
import Burger from "../Burger/Burger";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import {
    renderMovies,
    sortShortMovies,
    sortKeyMovies,
} from "../../utils/renderMovies";

function Main({
    isBurgerOpen,
    showBurger,
    handleSubmitEdit,
    isSending,
    handleLogOut,
    handleSubmitMovies,
    movies,
    savedMovies,
    handleSaveMovie,
    handleDeleteMovie,
}) {

    const [keyword, setKeyword] = useState(null);
    const [shorts, setShorts] = useState(false);
    const [emptyRes, setEmptyRes] = useState(null);
    const [renderedMovies, setRenderedMovies] = useState([]);

    const [keywordSaved, setKeywordSaved] = useState(null);
    const [shortsSaved, setShortsSaved] = useState(false);
    const [emptySave, setEmptySave] = useState(null);
    const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);

    const [renderNumber, setRenderNumber] = useState({
        rows: 1,
        columns: 3,
    });

    /* 
                    localStorage.setItem("localMovies", JSON.stringify(moviesData));
                localStorage.setItem("shorts", JSON.stringify(shorts));
                localStorage.setItem("keyword", JSON.stringify(keyword)); */
    
    const handleShorts = () => {
        setShorts(!shorts);
    };

    const handleShortsSaved = () => {
        setShortsSaved(!shortsSaved);
    };

    async function submitMovies(key) {
        try {
            setKeyword(key);
            if (!key) {
                return
            }
            setEmptyRes("Ничего не найдено")
            await handleSubmitMovies(key);
        } catch(err) {
            throw new Error(err.message);
        }
    }

    async function filterMovies(key) {
        try {
            setKeywordSaved(key);  
        } catch(err) {
            throw new Error("Сори, наш сервис дал сбой");
        }
    }


    function handleMore() {
        setRenderNumber(renderNumber => ({
            ...renderNumber,
            rows: renderNumber.rows + 1
        }));
    }

    useEffect(() => {
        setRenderedMovies(
            shorts
                ? sortShortMovies(sortKeyMovies(movies, keyword))
                : sortKeyMovies(movies, keyword)
        );
    }, [shorts, movies]);

    useEffect(() => {
        if (savedMovies.length) {
            setEmptySave("Ничего не найдено");
        } else {
            setEmptySave("Пока что нет добавленных фильмов");
        }
        setRenderedSavedMovies(
            keywordSaved
                ? shortsSaved
                    ? sortShortMovies(sortKeyMovies(savedMovies, keywordSaved))
                    : sortKeyMovies(savedMovies, keywordSaved)
                : shortsSaved
                ? sortShortMovies(savedMovies)
                : savedMovies
        );
    }, [keywordSaved, shortsSaved, savedMovies]);


    window.addEventListener("resize", () => {
        const width = document.documentElement.clientWidth;
/*         setTimeout(() => {
            if 
            setRenderNumber(renderNumber => ({
                ...renderNumber,
                columns: renderNumber.rows + 1
            }));
        }, 1000) */
    });

/*     useEffect(() => {
        setRenderNumber({
            rows: 1,
            columns: 3,
        });
    }, [movies]); */

    useEffect(() => {
        setRenderNumber({
            rows: 4,
            columns: 3,
        });
    }, []);

    return (
        <main className="main">
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
                        key={1}
                        handleSubmitMovies={submitMovies}
                        shorts={shorts}
                        handleShorts={handleShorts}
                        keyword={keyword}
                    />
                    {isSending ? (
                        <Preloader />
                    ) : (
                        <MoviesCardList>
                            {renderedMovies.length !== 0
                                ? renderMovies(
                                      renderedMovies.slice(0, renderNumber.rows * renderNumber.columns),
                                      handleSaveMovie,
                                      handleDeleteMovie,
                                      savedMovies
                                  )
                                : emptyRes}
                        </MoviesCardList>
                    )}
                    {renderedMovies.length > 3 &&
                    renderNumber.rows * renderNumber.columns < renderedMovies.length ? (
                        <More handleClick={handleMore} />
                    ) : null}
                </Route>

                <Route path="/saved-movies">
                    <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
                    <SearchForm
                        key={2}
                        handleSubmitMovies={filterMovies}
                        shorts={shortsSaved}
                        handleShorts={handleShortsSaved}
                        keyword={keywordSaved}
                    />
                    <MoviesCardList>
                        {renderedSavedMovies.length
                            ? renderMovies(
                                  renderedSavedMovies,
                                  handleSaveMovie,
                                  handleDeleteMovie,
                                  savedMovies
                              )
                            : emptySave}
                    </MoviesCardList>
                    <SavedDivider />
                </Route>

                <Route path="/profile">
                    <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
                    <Profile
                        handleSubmitEdit={handleSubmitEdit}
                        isSending={isSending}
                        handleLogOut={handleLogOut}
                    />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;
