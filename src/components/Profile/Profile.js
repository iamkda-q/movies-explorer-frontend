import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import "./Profile.css";
import { useForm } from "../../utils/useForms";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ handleSubmitEdit, isSending, handleLogOut }) {
    const { name, email } = useContext(CurrentUserContext);

    const { values, handleChange, setValues } = useForm();
    const [isFocus, setFocus] = useState({});
    const [isEdit, setEdit] = useState(false);
    const [updateError, setUpdateError] = useState({
        isError: false,
        errorText: "",
    });
    const [isSuccess, setSuccess] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = (e) => {
        setFocus({ ...isFocus, [e.target.name]: true });
    };
    const handleBlur = (e) => {
        setFocus({ ...isFocus, [e.target.name]: false });
    };

    const handleEdit = () => {
        setValues({
            name: name,
            email: email,
        });
        setEdit(!isEdit);
    };

    useEffect(() => {
        setUpdateError({
            ...updateError,
            isError: false,
        });
        setSuccess(false);
    }, [values]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitEdit(values);
            setSuccess(!isSuccess);
        } catch (err) {
            setUpdateError({
                isError: true,
                errorText: err.message,
            });
        }
    };

    /* автофокус на первый инпут при нажатии кнопки редактировать */
    useEffect(() => {
        inputRef.current.focus();
    }, [isEdit]);

    return (
        <section className="profile">
            <h1 className="profile__title">Привет, {name}</h1>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div
                    className={`profile__form-group ${
                        isFocus.name ? "profile__form-group_focus" : ""
                    }`}
                >
                    <label className="profile__label">Имя</label>
                    <input
                        type="text"
                        className="profile__input"
                        autoComplete="off"
                        name="name"
                        value={values.name ?? name}
                        onChange={handleChange}
                        placeholder="Введите имя"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={!isEdit}
                        ref={inputRef}
                    />
                </div>
                <div
                    className={`profile__form-group ${
                        isFocus.email ? "profile__form-group_focus" : ""
                    }`}
                >
                    <label className="profile__label">E&#8209;mail</label>
                    <input
                        type="text"
                        className="profile__input"
                        autoComplete="off"
                        name="email"
                        value={values.email ?? email}
                        onChange={handleChange}
                        placeholder="Введите email"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={!isEdit}
                    />
                </div>
                {isEdit || (
                    <Fragment>
                        <button
                            type="button"
                            className="profile__button profile__button_edit app__link-button-type"
                            onClick={handleEdit}
                        >
                            Редактировать
                        </button>
                        <button
                            type="button"
                            className="profile__button profile__button_exit app__link-button-type"
                            onClick={handleLogOut}
                        >
                            Выйти из аккаунта
                        </button>
                    </Fragment>
                )}
                {isEdit && (
                    <div className="profile__button-with-message">
                        <span
                            className={`profile__message ${
                                updateError.isError
                                    ? "profile__message_error"
                                    : isSuccess
                                    ? "profile__message_success"
                                    : "profile__message_hidden"
                            }`}
                        >
                            {updateError.isError
                                ? updateError.errorText
                                : isSuccess
                                ? "Данные успешно изменены!"
                                : ""}
                        </span>
                        <button
                            className={`profile__button profile__button_save app__link-button-type ${
                                updateError.isError || isSuccess
                                    ? "profile__button_disable"
                                    : ""
                            }`}
                        >
                            {isSending ? "Сохранение..." : "Сохранить"}
                        </button>
                    </div>
                )}
            </form>
        </section>
    );
}

export default Profile;
