import axiosInstance from '@/api';
import type {AxiosCommonRequestHeaders} from '@/types';

function setHeader(key: AxiosCommonRequestHeaders, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: AxiosCommonRequestHeaders) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
}

export {setHeader, removeHeader};
