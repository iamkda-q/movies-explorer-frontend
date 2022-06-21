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

    async signUp({ email, password, name }) {
        return await this._fetch("signup", "POST", {
            email,
            password,
            name,
        });
    },

    async signIn({ email, password }) {
        return await this._fetch("signin", "POST", {
            email,
            password,
        });
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

    async editProfile({ email, name }) {
        return await this._fetch("users/me", "PATCH", {
            email,
            name,
        });
    }
};

export const apiUser = {
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

    async editProfile({ email, name }) {
        return await this._fetch("users/me", "PATCH", {
            email,
            name,
        });
    }
};
