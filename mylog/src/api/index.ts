import axios from 'axios';

const BASE_URL = 'http://localhost:3030';
// const BASE_URL = 'http://10.0.2.2:3030'; //android emulator
// const BASE_URL = 'http://192.168.0.55:3030'; //ios device

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
