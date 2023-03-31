import { useContext } from "react";
import { AuthorizationContext } from "../context/context";
import FetchInterceptor from "../interceptors/fetch-intercepter";

export default class AuthService {
    static #API_URL = 'http://localhost:5000/api'

    static async login(userData) {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            };
            const response = await fetch(`${this.#API_URL}/login`, options);
            response
                .json()
                .then(data => localStorage.setItem('accessToken', data.accessToken))
                .then(data => useContext(AuthorizationContext).user = data.user)
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    static async registration(userData) {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
            const response = await fetch(`${this.#API_URL}/registration`, options);
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    static async logout() {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };
            const response = await fetch(`${this.#API_URL}/logout`, options);
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
            }
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    static async validateToken() {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };
            const response = await FetchInterceptor.request(`${this.#API_URL}/validate`, options);
            return response;
        } catch (e) {

        } 
    }

}
