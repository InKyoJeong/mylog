import axiosInstance from '@/api';
import type {AxiosCommonRequestHeaders} from '@/types';

const setHeader = (key: AxiosCommonRequestHeaders, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: AxiosCommonRequestHeaders) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
};

export {setHeader, removeHeader};
