import { Fragment, useState, useEffect } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";
import { useFormWithValidation } from "../../utils/useForms";

function Register({ loggedIn, handleSubmitReg, isSending }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const [regError, setRegError] = useState({
        isError: false,
        errorText: "",
    });

    useEffect(() => {
        setRegError({
            ...regError,
            isError: false,
        });
    }, [values]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitReg(values)
        } catch(err) {
            setRegError({
                isError: true,
                errorText: `Ошибка при регистрации: ${err.message.toLowerCase()}`,
            });
        };

    };

    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <form onSubmit={handleSubmit}>
                        <RegInput
                            value={values.name || ""}
                            name="name"
                            onChange={handleChange}
                            label="Имя"
                            type="text"
                            {...errors.name}
                        />
                        <RegInput
                            value={values.email || ""}
                            name="email"
                            label="E-mail"
                            type="email"
                            onChange={handleChange}
                            {...errors.email}
                        />
                        <RegInput
                            value={values.password || ""}
                            name="password"
                            label="Пароль"
                            type="password"
                            onChange={handleChange}
                            {...errors.password}
                        />
                        <RegButton
                            buttonText={
                                isSending ? "Пробуем..." : "Зарегистрироваться"
                            }
                            spanText="Уже зарегистрированы?"
                            link={loggedIn ? "/movies" : "/signin"}
                            linkText="Войти"
                            isDisabled={!isValid || regError.isError || isSending}
                            {...regError}
                        />
                    </form>
                </section>
            </main>
        </Fragment>
    );
}

export default Register;
