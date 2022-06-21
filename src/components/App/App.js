import React, { useState, useEffect, Fragment } from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Burger from "../Burger/Burger";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import { apiAuth, apiUser } from "../../utils/MainApi";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [isSending, setSending] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
    });
    const [isTokenValidated, setTokenValidated] = useState(false);

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
                    setCurrentUser({ ...user });
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
            await apiAuth.signUp({ ...values });
            history.push("/signin");
        } catch (err) {
            const { message } = { ...(await err.json()) };
            throw new Error(message);
        } finally {
            setSending((isSending) => !isSending);
        }
    };

    const handleSubmitLog = async (values) => {
        setSending(!isSending);
        try {
            const { token } = await apiAuth.signIn({ ...values });
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
        setLoggedIn(false);
        setTokenValidated(false);
        history.push("/signin");
    };

    const handleSubmitEdit = async (values) => {
        setSending(!isSending);
        try {
            const newUser = await apiUser.editProfile({ ...values });
            setCurrentUser({ ...newUser });
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
        <div className="app">
            {isTokenValidated ? (
                <>
                    <CurrentUserContext.Provider value={currentUser}>
                        <Switch>
                            <Route path="/signin">
                                {loggedIn ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Login
                                        handleSubmitLog={handleSubmitLog}
                                        isSending={isSending}
                                    />
                                )}
                            </Route>

                            <Route path="/signup">
                                {loggedIn ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Register
                                        loggedIn={loggedIn}
                                        handleSubmitReg={handleSubmitReg}
                                        isSending={isSending}
                                    />
                                )}
                            </Route>
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
                                    path={["/movies", "/saved-movies", "/"]}
                                    loggedIn={loggedIn}
                                    isBurgerOpen={burgerOpen}
                                    showBurger={showBurger}
                                    exact
                                />

                                <ProtectedRoute
                                    component={Profile}
                                    path="/profile"
                                    loggedIn={loggedIn}
                                    handleSubmitEdit={handleSubmitEdit}
                                    isSending={isSending}
                                    handleLogOut={handleLogOut}
                                    exact
                                />

                                <ProtectedRoute
                                    component={Burger}
                                    path={[
                                        "/movies",
                                        "/saved-movies",
                                        "/",
                                        "/profile",
                                    ]}
                                    loggedIn={loggedIn}
                                    isOpen={burgerOpen}
                                    showBurger={showBurger}
                                    exact
                                />

                                <ProtectedRoute
                                    component={Footer}
                                    path={["/movies", "/saved-movies", "/"]}
                                    loggedIn={loggedIn}
                                    isOpen={burgerOpen}
                                    showBurger={showBurger}
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
