import { Fragment, useState } from "react";
import RegButton from "../RegButton/RegButton";
import RegHeader from "../RegHeader/RegHeader";
import RegInput from "../RegInput/RegInput";
import apiAuth from "../../utils/MainApi";

function Register() {
    
    const [email, setEmail] = useState("ss@na.ru");
    const [password, setPassword] = useState("1111");
    const [name, setName] = useState("Виталий");

    const onSubmit = async (e) => {
        e.preventDefault();
        const answer = await apiAuth.signIn(email, password);
        if (answer.ok) {
            console.log(await answer.json());
        } else {
            console.log("Error");
        }
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Fragment>
            <RegHeader />
            <main>
                <section className="app__reg-container">
                    <form onSubmit={onSubmit}>
                        <RegInput
                            value={name}
                            onChange={handleChangeName}
                            label="Имя"
                            type="text"
                        />
                        <RegInput
                            value={email}
                            label="E-mail"
                            type="email"
                            onChange={handleChangeEmail}
                        />
                        <RegInput
                            value={password}
                            label="Пароль"
                            type="password"
                            onChange={handleChangePassword}
                        />
                        <RegButton
                            buttonText="Зарегистрироваться"
                            spanText="Уже зарегистрированы?"
                            link="/signin"
                            linkText="Войти"
                        />
                    </form>
                </section>
            </main>
        </Fragment>
    );
}

export default Register;
