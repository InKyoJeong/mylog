import axiosInstance from '.';

import {Marker} from '@/types/marker';

export type GetMarkerResponse = Pick<
  Marker,
  'id' | 'latitude' | 'longitude' | 'color'
>;

const getMarkers = async (): Promise<GetMarkerResponse[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

const getMarker = async (id: string): Promise<Marker> => {
  const {data} = await axiosInstance.get(`/markers/${id}`);

  return data;
};

const getPosts = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/posts/my');

  return data;
};

export {getMarkers, getMarker, getPosts};
