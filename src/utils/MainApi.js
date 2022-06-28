export const apiAuth = {
    mainUrl: "https://api.movies-exp-iamkda-q.nomoredomains.xyz",

    async _fetch(relUrl, method = "GET", body = undefined) {
        const data = await fetch(`${this.mainUrl}/${relUrl}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: method,
            body: JSON.stringify(body),
        });
        if (data.ok) {
            return data.json();
        } else {
            return Promise.reject(data)
        }
    },

    async signUp(body) {
        return await this._fetch("signup", "POST", body);
    },

    async signIn(body) {
        return await this._fetch("signin", "POST", body);
    },

    async tokenCheck(token) {
        const res = await fetch(`${this.mainUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    },
};

export const apiMain = {
    mainUrl: "https://api.movies-exp-iamkda-q.nomoredomains.xyz",

    async _fetch(relUrl, method = "GET", body = undefined) {
        const data = await fetch(`${this.mainUrl}/${relUrl}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("usersToken")}`
            },
            method: method,
            body: JSON.stringify(body),
        });
        if (data.ok) {
            return data.json();
        } else {
            return Promise.reject(data)
        }
    },

    async editProfile(body) {
        return await this._fetch("users/me", "PATCH", body);
    },

    async getMovies() {
        return await this._fetch("movies");
    },

    async saveMovie(movie) {
        return await this._fetch("movies", "POST", movie);
    },

    async deleteMovie(id) {
        return await this._fetch(`movies\\${id}`, "DELETE");
    }
};