import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class ApiService {
    static #API_URL = 'http://localhost:5000/api';

    static async searchUser(userTag) {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
        if (userTag) {
            const response = await FetchInterceptor.request(`${this.#API_URL}/searchuser?userTag=${userTag}`, options);
            return response;
        }

    }

    static async getUserChats(userId) {
        const options = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }
        if (userId) {
            const response = await FetchInterceptor.request(`${this.#API_URL}/chats?userId=${userId}`, options)
            const body = await response.json();
            return body;
        }
    }

    static async updateUserOptions(formValue) {
        const formdata = new FormData();
        formdata.append('avatar', formValue.avatar);
        formdata.append('background', formValue.background);
        formdata.append('nickname', formValue.nickname);
        const options = {
            method: 'PUT',
            credentials: 'include',
            body: formdata
        }
        if (formValue) {
            const response = await FetchInterceptor.request(`${this.#API_URL}/updateuser`, options);
            const body = await response.json();
            return body;
        }
    }

}