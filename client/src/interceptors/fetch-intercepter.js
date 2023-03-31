export default class FetchInterceptor {

    static #API_URL = 'http://localhost:5000/api';

    static #getToken() {
        return localStorage.getItem('accessToken');
    }

    static #saveToken(accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }
    
    static async #refreshToken() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }
        const response = await this.request(`${this.#API_URL}/refresh`, options);
        response
            .json()
            .then(data => this.#saveToken(data.accessToken))
    }

    static async request (url, options) {
        const accessToken =  this.#getToken();
        const response  = await fetch(url, {...options, headers: {...options?.headers, authorization: `Bearer ${accessToken}`}});
        if (response.status === 401) {
            await this.#refreshToken()
            return this.request(url, options);
        }
        return response
    }

}