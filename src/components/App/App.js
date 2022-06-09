import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Burger from "../Burger/Burger";


function App() {
    const [burgerOpen, setBurgerOpen] = React.useState(false);

    function showBurger() {
        setBurgerOpen(!burgerOpen);
    }

    return (
        <div className="app">
            <Route path={["/movies", "/saved-movies", "/profile", "/"]} exact>
                <Header showBurger={showBurger}/>
            </Route>
            <Switch>
                <Route path={["/movies", "/saved-movies", "/"]} exact>
                    <Main isBurgerOpen={burgerOpen} showBurger={showBurger}/>
                </Route>
                <Route path="/profile">
                    <Burger isOpen={burgerOpen} showBurger={showBurger}/>
                    <Profile />
                </Route>
                <Route path="/signup">
                    <Register />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
            </Switch>
            <Route path={["/movies", "/saved-movies", "/"]} exact>
                <Footer />
            </Route>
            <Route path="/404" exact>
                <NotFound />
            </Route>
        </div>
    );
}

export default App;
