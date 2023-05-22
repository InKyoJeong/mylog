import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
