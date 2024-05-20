import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://reqres.in/api/', // Replace with your backend API URL
    timeout: 5000, // Timeout after 5 seconds
});

export default axiosInstance;
