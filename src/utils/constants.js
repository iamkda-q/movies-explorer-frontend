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

const FIVECARDS = {
    width: 550,
    cards: {
        rows: 5,
        columns: 1,
    },
    add: 2,
};

const EIGHTCARDS = {
    width: 850,
    cards: {
        rows: 4,
        columns: 2,
    },
    add: 1,
};

const TWELVECARDS = {
    width: 3000,
    cards: {
        rows: 4,
        columns: 3,
    },
    add: 1,
};

const SHORTDURATION = 40;

export { profilePlaceholders, calcTime, FIVECARDS, EIGHTCARDS, TWELVECARDS, SHORTDURATION };
