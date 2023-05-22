import axiosInstance from './axios';

type RequestFeedback = {
  email: string;
  title: string;
  description: string;
};

const addFeedback = async (body: RequestFeedback) => {
  const {data} = await axiosInstance.post('/feedback', body);

  return data;
};

export {addFeedback};
export type {RequestFeedback};
