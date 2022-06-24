import React, { useState, useEffect, Fragment } from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import Preview from "../Preview/Preview";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

import { apiAuth, apiMain } from "../../utils/MainApi";
import getMovies from "../../utils/MovieApi";

function App() {
    const [isTokenValidated, setTokenValidated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [isSending, setSending] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
    });
    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    const history = useHistory();

    function showBurger() {
        setBurgerOpen(!burgerOpen);
    }

    function checkToken() {
        const token = localStorage.getItem("usersToken");
        if (token) {
            apiAuth
                .tokenCheck(token)
                .then((user) => {
                    setLoggedIn(true);
                    setCurrentUser(user);
                    setTokenValidated(true);
                })
                .catch(() => {
                    console.log("Не удалось войти в систему");
                });
        } else {
            setTokenValidated(true);
        }
    }

    useEffect(() => {
        checkToken();
    }, [loggedIn]);

    const handleSubmitReg = async (values) => {
        setSending(!isSending);
        try {
            const { email, password } = { ...values };
            await apiAuth.signUp(values);
            await handleSubmitLog({ email, password });
            history.push("/movies");
        } catch (err) {
            const { message } = { ...(await err.json()) };
            throw new Error(message);
        } finally {
            setSending((isSending) => {
                return !isSending ? isSending : !isSending;
            });
        }
    };

    const handleSubmitLog = async (values) => {
        setSending((isSending) => {
            return isSending ? isSending : !isSending;
        });
        try {
            const { token } = await apiAuth.signIn(values);
            localStorage.setItem("usersToken", token);
            setLoggedIn(true);
            history.push("/movies");
        } catch (err) {
            const { message } =
                err.status === 401
                    ? { ...(await err.json()) }
                    : { message: "Проверьте правильность вводимых данных" };
            throw new Error(message);
        } finally {
            setSending((isSending) => !isSending);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("usersToken");
        localStorage.removeItem("localMovies");
        localStorage.removeItem("shorts");
        localStorage.removeItem("keyword");
        setLoggedIn(false);
        setTokenValidated(false);
        history.push("/signin");
    };

    const handleSubmitEdit = async (values) => {
        setSending(!isSending);
        try {
            const newUser = await apiMain.editProfile(values);
            setCurrentUser(newUser);
        } catch (err) {
            const { message } =
                err.status === 409
                    ? { ...(await err.json()) }
                    : {
                          message:
                              "При обновлении профиля произошла ошибка. Проверьте валидность данных",
                      };
            throw new Error(message);
        } finally {
            setSending((isSending) => !isSending);
        }
    };

    const handleSubmitMovies = async (keyword) => {
        setSending(!isSending);
        try {
            const localMovies = localStorage.getItem("localMovies");
            if (localMovies) {
                setMovies(JSON.parse(localMovies));
            } else {
                const moviesData = await getMovies();
                localStorage.setItem("localMovies", JSON.stringify(moviesData));
                setMovies(moviesData);
            }
        } catch (err) {
            throw new Error(
                "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
        } finally {
            setSending((isSending) => !isSending);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            (async () => {
                setSavedMovies(await apiMain.getMovies());
            })();
        }
    }, [loggedIn]);

    const handleSaveMovie = async (movie) => {
        try {
            const moviesCopy = { ...movie };
            for (let prop in moviesCopy) {
                moviesCopy[prop] = moviesCopy[prop]
                    ? moviesCopy[prop]
                    : "Информация отсутствует";
            }

            const {
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                id: movieId,
                nameRU,
                nameEN,
            } = moviesCopy;
            const savedMovie = await apiMain.saveMovie({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                movieId,
                nameRU,
                nameEN,
            });
            setSavedMovies((movies) => {
                return [...movies, savedMovie];
            });
        } catch (err) {
            throw new Error("ПЕРЕПИСАТЬ ОШИБКУ");
        }
    };

    const handleDeleteMovie = async (id) => {
        try {
            const movieForRemove = savedMovies.find(
                (movie) => movie.movieId === id
            );
            await apiMain.deleteMovie(movieForRemove._id);
            setSavedMovies((movies) =>
                movies.filter((movie) => movie.movieId !== id)
            );
        } catch (err) {
            throw new Error("ПЕРЕПИСАТЬ ОШИБКУ");
        }
    };

    function Landing() {
        return (
            <>
                <Header />
                <main>
                    <Preview />
                    <AboutProject />
                    <Techs />
                    <AboutMe />
                </main>
                <Footer />
            </>
        );
    }

    /* узнать почему не работает в таком исполнении при помещении в протектедРоут*/
    /*     function MainPage() {
        return (
            <>
                <Header showBurger={showBurger} loggedIn={loggedIn} />
                <Main isBurgerOpen={burgerOpen} showBurger={showBurger} />
                <Footer />
            </>
        );
    } */

    return (
        <div className={`app ${burgerOpen ? "app_stopped" : ""}`}>
            {isTokenValidated ? (
                <>
                    <CurrentUserContext.Provider value={currentUser}>
                        <Switch>
                            <Route path="/signin">
                                {loggedIn ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Login
                                        handleSubmitLog={handleSubmitLog}
                                        isSending={isSending}
                                    />
                                )}
                            </Route>

                            <Route path="/signup">
                                {loggedIn ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Register
                                        loggedIn={loggedIn}
                                        handleSubmitReg={handleSubmitReg}
                                        isSending={isSending}
                                    />
                                )}
                            </Route>

                            {!loggedIn ? (
                                <Route exact path="/">
                                    <Landing />
                                </Route>
                            ) : null}

                            <Route
                                path={[
                                    "/movies",
                                    "/saved-movies",
                                    "/",
                                    "/profile",
                                ]}
                                exact
                            >
                                <ProtectedRoute
                                    component={Header}
                                    path={[
                                        "/movies",
                                        "/saved-movies",
                                        "/",
                                        "/profile",
                                    ]}
                                    loggedIn={loggedIn}
                                    showBurger={showBurger}
                                    exact
                                />

                                <ProtectedRoute
                                    component={Main}
                                    path={[
                                        "/movies",
                                        "/saved-movies",
                                        "/",
                                        "/profile",
                                    ]}
                                    loggedIn={loggedIn}
                                    isBurgerOpen={burgerOpen}
                                    showBurger={showBurger}
                                    handleSubmitEdit={handleSubmitEdit}
                                    isSending={isSending}
                                    handleLogOut={handleLogOut}
                                    handleSubmitMovies={handleSubmitMovies}
                                    movies={movies}
                                    savedMovies={savedMovies}
                                    handleSaveMovie={handleSaveMovie}
                                    handleDeleteMovie={handleDeleteMovie}
                                    exact
                                />

                                <ProtectedRoute
                                    component={Footer}
                                    path={["/movies", "/saved-movies", "/"]}
                                    loggedIn={loggedIn}
                                    exact
                                />
                            </Route>

                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </CurrentUserContext.Provider>
                </>
            ) : (
                <Preloader />
            )}
        </div>
    );
}

export default App;
