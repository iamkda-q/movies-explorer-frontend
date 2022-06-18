// import { Route } from "react-router-dom";
import React from "react";
import "./SearchForm.css";
import searchIcon from "../../assets/images/search-icon.svg";

function SearchForm({ handleSubmit, shorts, changeShorts }) {

    const onSubmit = (evt) => {
        evt.preventDefault();
        handleSubmit();
    }

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" name="search__form" onSubmit={onSubmit}>
                    <img
                        src={searchIcon}
                        alt="Иконка поиска"
                        className="search__icon"
                    />
                    <input
                        type="text"
                        name="search__input"
                        className="search__input"
                        autoComplete="off"
                        placeholder="Фильм"
                    />
                    <label className="search__input-label"></label>
                    <button type="submit" className="search__button">
                        Найти
                    </button>
                </form>
                <div className="search__shorts">
                    <label className="search__shorts-label">
                        <input
                            checked={shorts} 
                            onChange={changeShorts}
                            type="checkbox"
                            className="search__shorts-chekcbox"
                        />
                        <div className="search__checkbox-div"></div>
                    </label>
                    <p className="search__shorts-text">Короткометражки</p>
                </div>
            </div>
        </section>
    );
}

export default SearchForm;
