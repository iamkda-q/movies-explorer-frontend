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


function Main() {
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
                    <SearchForm />
                    <MoviesCardList>
                        <MoviesCard />
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />        
                        <MoviesCard />                      
                        <MoviesCard />                      
                        <MoviesCard />                
                    </MoviesCardList>
                    <More />
                </Route>
                <Route path="/saved-movies">
                    <SearchForm />
                    <MoviesCardList>
                        <MoviesCard />
                        <MoviesCard />                      
                        <MoviesCard />                                   
                    </MoviesCardList>
                </Route>
            </Switch>
        </main>
    );
}


export default Main;
