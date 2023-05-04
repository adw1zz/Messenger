import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class AuthService {
    static #API_URL = 'http://localhost:5000/api'

    static async login(userData) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        };
        const response = await fetch(`${this.#API_URL}/login`, options);
        if (response.status !== 200) {
            return await response.json();
        } else {
            const body = await response.json();
            localStorage.setItem('accessToken', body.accessToken);
            return body;
        }

    }

    static async registration(formValue) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValue)
        }
        const response = await fetch(`${this.#API_URL}/registration`, options);
        if (response.status !== 200) {
            return await response.json();
        } else {
            return false
        }
    }

    static async logout() {
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
            };
            const response = await fetch(`${this.#API_URL}/logout`, options);
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
            }
        } catch (e) {
            console.log(e);
        }
    }

}
