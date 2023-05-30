import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.escuelajs.co/api/v1/',
  baseURL: 'http://localhost:5002/'
});

export const backupAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

export default axiosInstance;
