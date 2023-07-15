import axiosInstance from './axios';
import type {Friend} from '@/types';

const getMyFriends = async (): Promise<Friend[]> => {
  const {data} = await axiosInstance.get('/friends');

  return data;
};

const getPendingFriends = async (): Promise<Friend[]> => {
  const {data} = await axiosInstance.get('/friends/requests');

  return data;
};

const sendFriendRequest = async (receiverId: string) => {
  const {data} = await axiosInstance.post(`/friends/requests/${receiverId}`);

  return data;
};

const acceptFriendRequest = async (requesterId: string) => {
  const {data} = await axiosInstance.patch(`/friends/requests/${requesterId}`);

  return data;
};

export {
  getMyFriends,
  getPendingFriends,
  sendFriendRequest,
  acceptFriendRequest,
};
