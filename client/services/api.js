import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
    const userInfo = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (email, password) => API.post('/auth/login', { email, password }),
    register: (userData) => API.post('/auth/register', userData),
};

export const courseService = {
    getAll: () => API.get('/courses'),
    create: (courseData) => API.post('/courses', courseData),
    delete: (id) => API.delete(`/courses/${id}`),
    enroll: (id) => API.post(`/enroll/${id}`),
    getMyCourses: () => API.get('/enroll/my-courses'),
};

export default API;
