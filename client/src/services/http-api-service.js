import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class ApiService {
    static #API_URL = 'http://localhost:5000/api';

    static async searchUsers(userTag) {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        if (userTag) {
            const response = await FetchInterceptor.request(`${this.#API_URL}/searchusers?userTag=${userTag}`, options);
            return response;
        }

    }

    static async getUserChats(userId) {
        const options = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        if (userId) {
            const response = await FetchInterceptor.request(`${this.#API_URL}/chats?userId=${userId}`, options)
            const body = await response.json();
            return body;
        }
    }
}