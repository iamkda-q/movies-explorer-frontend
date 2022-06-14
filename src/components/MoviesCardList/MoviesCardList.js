// import { Route } from "react-router-dom";
import "./MoviesCardList.css";

function MoviesCardList(props) {
    return (
        <section className="movies">
            {props.children}
        </section>
    )
}

export default MoviesCardList;
