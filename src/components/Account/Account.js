import icon from "../../assets/images/account-icon.svg";
import "./Account.css";

function Account() {
    return (
        <div className="account">
            <p className="account__txt">Аккаунт</p>
            <div>
                <img src={icon} alt="Иконка логина" className="account__icon" />
            </div>
        </div>
    );
}

export default Account;
