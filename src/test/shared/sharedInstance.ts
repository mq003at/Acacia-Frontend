import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.escuelajs.co/api/v1/',
  baseURL: 'https://acacia-backend.azurewebsites.net/'
});

export const backupAxiosInstance = axios.create({
  baseURL: 'http://localhost:5002',
});

export default axiosInstance;
