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
    loggedIn
}) {
    const [keyword, setKeyword] = useState(localStorage.getItem("keyword") ? JSON.parse(localStorage.getItem("keyword")) : "");
    const [shorts, setShorts] = useState(localStorage.getItem("shorts") ? JSON.parse(localStorage.getItem("shorts")) : false);
    const [emptyRes, setEmptyRes] = useState(null);
    const [renderedMovies, setRenderedMovies] = useState([]);

    const [keywordSaved, setKeywordSaved] = useState(null);
    const [shortsSaved, setShortsSaved] = useState(false);
    const [emptySave, setEmptySave] = useState(null);
    const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);

    const [renderNumber, setRenderNumber] = useState({});

    const handleShorts = () => {
        setShorts(!shorts);
    };

    const handleShortsSaved = () => {
        setShortsSaved(!shortsSaved);
    };

    async function submitMovies(key) {
        try {
            if (!key) {
                return;
            }
            setKeyword(key);
            setEmptyRes("Ничего не найдено");
            await handleSubmitMovies(key);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function filterMovies(key) {
        try {
            setKeywordSaved(key);
        } catch (err) {
            throw new Error("Сори, наш сервис дал сбой");
        }
    }

    useEffect(() => {
        if (Array.isArray(movies) && movies.length !== 0) {
            setRenderedMovies(
                shorts
                    ? sortShortMovies(sortKeyMovies(movies, keyword))
                    : sortKeyMovies(movies, keyword)
            );
            localStorage.setItem("keyword", JSON.stringify(keyword));
            localStorage.setItem("shorts", JSON.stringify(shorts));
        }
    }, [shorts, movies]);

    useEffect(() => {
        if (savedMovies.length) {
            setEmptySave("Ничего не найдено");
        } else {
            setEmptySave("Пока что нет добавленных фильмов");
        }
        if (Array.isArray(savedMovies) && savedMovies.length !== 0) {
            setRenderedSavedMovies(
                keywordSaved
                    ? shortsSaved
                        ? sortShortMovies(sortKeyMovies(savedMovies, keywordSaved))
                        : sortKeyMovies(savedMovies, keywordSaved)
                    : shortsSaved
                    ? sortShortMovies(savedMovies)
                    : savedMovies
            );
        }

    }, [keywordSaved, shortsSaved, savedMovies]);

    const calcMoviesNumber = (width) => {
        if (width <= 550) {
            return {
                rows: 5,
                columns: 1,
            };
        } else if (width <= 850) {
            return {
                rows: 4,
                columns: 2,
            };
        } else {
            return {
                rows: 4,
                columns: 3,
            };
        }
    };

    window.addEventListener("resize", resizeThrottler, false);
    let resizeTimeout = null;
    function resizeThrottler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                actualResizeHandler();
            }, 3000);
        }
    }
    function actualResizeHandler() {
        const { rows, columns } = calcMoviesNumber(
            document.documentElement.clientWidth
        );
        if (rows !== renderNumber.rows || columns !== renderNumber.columns) {
            setRenderNumber({ rows, columns });
        }
    }

    useEffect(() => {
        setRenderNumber(calcMoviesNumber(document.documentElement.clientWidth));
        if (JSON.parse(localStorage.getItem("keyword") !== null)) {
            submitMovies(keyword);
        }
    }, []);

    function handleMore() {
        setRenderNumber((renderNumber) => ({
            ...renderNumber,
            rows: renderNumber.rows + (renderNumber.columns === 1 ? 2 : 1),
        }));
    }

    return (
        <main className="main">
            <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
            <Switch>
                <Route exact path="/">
                    <Preview />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                </Route>

                <Route path="/movies">
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
                                      renderedMovies.slice(
                                          0,
                                          renderNumber.rows *
                                              renderNumber.columns
                                      ),
                                      handleSaveMovie,
                                      handleDeleteMovie,
                                      savedMovies
                                  )
                                : emptyRes}
                        </MoviesCardList>
                    )}
                    {renderedMovies.length > 3 &&
                    renderNumber.rows * renderNumber.columns <
                        renderedMovies.length ? (
                        <More handleClick={handleMore} />
                    ) : null}
                </Route>

                <Route path="/saved-movies">
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
                </Route>

                <Route path="/profile">
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
