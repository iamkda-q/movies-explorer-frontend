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
import image from "../../assets/images/1.png";

function Main({ isBurgerOpen, showBurger }) {
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
                    <SearchForm />
                    <MoviesCardList>
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                    </MoviesCardList>
                    <More />
                </Route>
                <Route path="/saved-movies">
                    <Burger isOpen={isBurgerOpen} showBurger={showBurger} />
                    <SearchForm />
                    <MoviesCardList>
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                        <MoviesCard image={image} name="33 слова о дизайне" duration="1ч 17м" />
                    </MoviesCardList>
                    <SavedDivider />
                </Route>
            </Switch>
        </main>
    );
}

export default Main;
