import axiosInstance from '.';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserRequest {
  username: string;
  password: string;
}

const postSignup = async ({username, password}: UserRequest): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {username, password});

  return data;
};

const postLogin = async ({
  username,
  password,
}: UserRequest): Promise<TokenResponse> => {
  const {data} = await axiosInstance.post('/auth/signin', {username, password});

  return data;
};

const getProfile = async (): Promise<{username: string}> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<TokenResponse> => {
  const {data} = await axiosInstance.get('/auth/refresh');

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
