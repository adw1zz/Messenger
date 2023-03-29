export default class FetchInterceptor {
    static #getToken() {
        return localStorage.getItem('accessToken');
    }

    static #saveToken(accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }
    
    static async #refreshToken() {
        const response = await this.request('/refresh');
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