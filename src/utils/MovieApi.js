const moviesUrl = "https://api.nomoreparties.co";

async function getMovies() {
    try {
        const data = await fetch(`${moviesUrl}/beatfilm-movies`, {
            headers: {
                "Content-Type": "application/json",
            }
        },
        )
        if (data.ok) {
            const movies = await data.json();
            movies.forEach(movie => {
                movie.image.url = `${moviesUrl}/${movie.image.url}`;
            });
            return movies;
        } else {
            throw new Error("Ошибка на стороне сервера, попробуйте немного позже");
        }
    } catch(err) {
        return err.message;
    }
}

export default getMovies;
