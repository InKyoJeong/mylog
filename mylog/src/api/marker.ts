import axiosInstance from '.';

import {Marker} from '@/types/api';

export type ResponseMarker = Marker;

const getMarkers = async (): Promise<ResponseMarker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

const getMarker = async (id: string): Promise<ResponseMarker> => {
  const {data} = await axiosInstance.get(`/markers/${id}`);

  return data;
};

export type RequestCreateMarker = Omit<Marker, 'id'>;

const createMarker = async ({...body}: RequestCreateMarker) => {
  const {data} = await axiosInstance.post('/markers', body);

  return data;
};

export {getMarkers, getMarker, createMarker};
