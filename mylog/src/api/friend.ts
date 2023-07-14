import axiosInstance from './axios';

const sendFriendRequest = async (receiverId: string) => {
  const {data} = await axiosInstance.post(`/friends/requests/${receiverId}`);

  return data;
};

const acceptFriendRequest = async (requesterId: string) => {
  const {data} = await axiosInstance.patch(`/friends/requests/${requesterId}`);

  return data;
};

export {sendFriendRequest, acceptFriendRequest};
