const profilePlaceholders = {
    text: "Введите имя",
    email: "Введите email",
    password: "Введите пароль",
};

function calcTime(min) {
    let currentMinutes = min % 60;
    currentMinutes =
        currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    const currentHours = min / 60 >= 1 ? Math.floor((min / 60) % 60) : 0;
    return `${currentHours}ч ${currentMinutes}м`;
}

export { profilePlaceholders, calcTime };
