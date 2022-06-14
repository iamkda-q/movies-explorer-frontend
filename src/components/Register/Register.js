import { Fragment } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";

function Register() {
    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <RegInput value="Виталий" label="Имя" type="text" />
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
                        buttonText="Зарегистрироваться"
                        spanText="Уже зарегистрированы?"
                        link="/signin"
                        linkText="Войти"
                    />
                </section>
            </main>
        </Fragment>
    );
}

export default Register;
