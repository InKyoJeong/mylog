import axiosInstance from './axios';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.post('/images', body);

  return data;
};

export {uploadImages};
