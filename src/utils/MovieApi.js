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
                movie.thumbnail = `${moviesUrl}${movie.image.formats.thumbnail.url}`
                movie.image = `${moviesUrl}${movie.image.url}`;
            });
            return movies;
        } else {
            return Promise.reject(data)
        }
    } catch(err) {
        return err.message;
    }
}

export default getMovies;
