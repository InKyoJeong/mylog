import axiosInstance from '.';

import type {ImageUri, Marker} from '@/types/domain';

export type ResponseMarker = Marker & {images: ImageUri[]};

const getMarkers = async (): Promise<ResponseMarker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

const getMarker = async (id: number): Promise<ResponseMarker> => {
  const {data} = await axiosInstance.get(`/markers/${id}`);

  return data;
};

export type RequestCreateMarker = Omit<Marker, 'id'> & {imageUris: ImageUri[]};

const createMarker = async (body: RequestCreateMarker) => {
  const {data} = await axiosInstance.post('/markers', body);

  return data;
};

export {getMarkers, getMarker, createMarker};
