import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class ApiService {
    static #API_URL = 'http://localhost:5000/api';

    static async getUserData() {
        const options = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await FetchInterceptor.request(`${this.#API_URL}/user`, options);
        if (response.status === 401 ){
            return false
        } else {
            return await response.json();
        }
    }

}