import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT (if present) to every outgoing request.
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// On 401 the token is either missing, invalid, or expired.
// Wipe the stored credentials so the AuthContext picks up the change on the next
// route render. We don't navigate here — that's the UI's job.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Notify any listener (AuthContext) so it can reset state.
            window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
