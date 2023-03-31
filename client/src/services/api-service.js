import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class ApiService {
    static #API_URL = 'http://localhost:5000/api';

    static async searchUser(userTag) {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
            const response = await FetchInterceptor.request(`${this.#API_URL}/searchuser?userTag=${userTag}`, options);
            const body = await response.json();
            return body;
        } catch (e) {
            console.log(e);
        }
    }
}