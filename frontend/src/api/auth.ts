import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Add authorization header to all requests if token exists
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async signUp(data: { email: string; name: string; password: string }) {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response.data;
    },

    async signIn(data: { email: string; password: string }) {
        const response = await axios.post(`${API_URL}/signin`, data);
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    },

    async refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    },

    async getProfile() {
        const response = await axios.get('http://localhost:3000/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}; 