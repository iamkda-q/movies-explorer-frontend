import React, { Fragment, useState, useEffect } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";
import apiAuth from "../../utils/MainApi";
import { useForm, useFormWithValidation } from "../../utils/useForms";

function Login() {
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

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log({ ...values });
        try {
            const answer = await apiAuth.signIn({ ...values });
            console.log(answer);
        } catch (err) {
            const { message } =
                err.status === 401
                    ? { ...await err.json() }
                    : { message: "Проверьте правильность вводимых данных" };
            setLogError({
                isError: true,
                errorText: `Извините, но в доступе отказано. ${message}`,
            });
        }
    };

    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <form onSubmit={onSubmit}>
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
                            buttonText="Войти"
                            spanText="Ещё не зарегистрированы?"
                            link="/signup"
                            linkText="Регистрация"
                            isDisabled={!isValid}
                            {...logError}
                        />
                    </form>
                </section>
            </main>
        </Fragment>
    );
}

export default Login;
