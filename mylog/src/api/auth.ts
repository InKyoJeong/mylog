import axiosInstance from '.';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const signup = async (): Promise<void> => {
  const {data} = await axiosInstance.post('/signup');

  return data;
};

const login = async (): Promise<TokenResponse> => {
  const {data} = await axiosInstance.post('/signin');

  return data;
};

const getProfile = async (): Promise<{username: string}> => {
  const {data} = await axiosInstance.get('/me');

  return data;
};

const getAccessToken = async (): Promise<TokenResponse> => {
  const {data} = await axiosInstance.get('/refresh');

  return data;
};

const logout = async () => {
  await axiosInstance.post('/logout');
};

export {signup, login, getProfile, getAccessToken, logout};
