import React, { Fragment, useState, useEffect } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";
import { useFormWithValidation } from "../../utils/useForms";

function Login({ handleSubmitLog, isSending }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const [logError, setLogError] = useState({
        isError: false,
        errorText: "",
    });

    useEffect(() => {
        setLogError({
            ...logError,
            isError: false,
        });
    }, [values]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmitLog(values);
        } catch (err) {
            setLogError({
                isError: true,
                errorText: `Извините, но в доступе отказано. ${err.message}`,
            });
        }
    };

    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <form onSubmit={handleSubmit}>
                        <RegInput
                            value={values.email || ""}
                            label="E-mail"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            {...errors.email}
                        />
                        <RegInput
                            value={values.password || ""}
                            label="Пароль"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            {...errors.password}
                        />
                        <RegButton
                            buttonText={isSending ? "Пробуем..." : "Войти"}
                            spanText="Ещё не зарегистрированы?"
                            link="/signup"
                            linkText="Регистрация"
                            isDisabled={!isValid || logError.isError}
                            {...logError}
                        />
                    </form>
                </section>
            </main>
        </Fragment>
    );
}

export default Login;
