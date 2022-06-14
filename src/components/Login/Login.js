import { Fragment } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";

function Login() {
    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <RegInput
                        value="pochta@yandex.ru"
                        label="E-mail"
                        type="email"
                    />
                    <RegInput
                        value="pochta@yandex.ru"
                        label="Пароль"
                        type="password"
                    />
                    <RegButton
                        buttonText="Войти"
                        spanText="Ещё не зарегистрированы?"
                        link="/signup"
                        linkText="Регистрация"
                    />
                </section>
            </main>
        </Fragment>
    );
}

export default Login;
