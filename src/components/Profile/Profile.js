import { useState } from "react";
import "./Profile.css";

function Profile() {
    const [name, setName] = useState("Виталий");
    const [email, setEmail] = useState("pochta@yandex.ru");

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form" name="profile__form">
                <div className="profile__form-group">
                    <label className="profile__label">Имя</label>
                    <input
                        type="text"
                        className="profile__input"
                        autoComplete="off"
                        value={name}
                        onChange={handleChangeName}
                    />
                </div>
                <div className="profile__form-group">
                    <label className="profile__label">E&#8209;mail</label>
                    <input
                        type="text"
                        className="profile__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </div>
                <button className="profile__button profile__button_edit app__link-button-type hidden">
                    Редактировать
                </button>
                <button className="profile__button profile__button_exit app__link-button-type hidden">
                    Выйти из аккаунта
                </button>
                <div className="profile__button-with-error">
                    <span className="profile__error">
                        При обновлении профиля произошла ошибка.
                    </span>
                    <button
                        type="submit"
                        className="profile__button profile__button_save app__link-button-type"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Profile;
