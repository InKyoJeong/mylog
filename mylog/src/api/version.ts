import axiosInstance from './axios';

type ResponseVersion = {
  ios: string;
  android: string;
};

const getVersion = async (): Promise<ResponseVersion> => {
  const {data} = await axiosInstance.get('/version');

  return data;
};

export {getVersion};
export type {ResponseVersion};
