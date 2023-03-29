export default class AuthService {
    static #API_URL = 'http://localhost:5000/api' 
    
    static async login(userData) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(userData)
        };
        const response = await fetch(`${this.#API_URL}/login`, options);
        response
            .clone()
            .json()
            .then(data => localStorage.setItem('accessToken', data.accessToken))
        return response;
    }

    static async registration(userData) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        };
        const response = await fetch(`${this.#API_URL}/registration`, options);
        return response;
    }

    static logout() {
        localStorage.removeItem('accessToken');
    }

    static async getUsers() {
        
    }
}
