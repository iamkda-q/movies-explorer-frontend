const apiAuth = {
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
            return await data.json();
        } else {
            return Promise.reject(data)
        }
    },

    async signUp(email, password, name) {
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
};

export default apiAuth;
