// import { Route } from "react-router-dom";
import React, { useRef, useState } from "react";
import "./SearchForm.css";
import searchIcon from "../../assets/images/search-icon.svg";
import { useForm } from "../../utils/useForms"

function SearchForm({ handleSubmitMovies, shorts, handleShorts, keyword }) {

    const [placeholder, setPlaceholder] = useState(null);
    const { values, handleChange } = useForm();
    const searchRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const key = searchRef.current.value.trim();
            if (!key) {
                setPlaceholder("Нужно ввести ключевое слово");
            }
            await handleSubmitMovies(key);
        } catch (err) {
            console.log(err.message);
/*             setUpdateError({
                isError: true,
                errorText: err.message,
            }); */
        }
    };

    const handleFocus = () => {
        setPlaceholder(null)
    };

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={handleSubmit}>
                    <img
                        src={searchIcon}
                        alt="Иконка поиска"
                        className="search__icon"
                    />
                    <input
                        type="text"
                        name="keyword"
                        className="search__input"
                        autoComplete="off"
                        placeholder={placeholder ?? "Фильм"}
                        value={values.keyword ?? (keyword || "")}
                        onChange={handleChange}
                        ref={searchRef}
                        onFocus={handleFocus}
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
                            onChange={handleShorts}
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
