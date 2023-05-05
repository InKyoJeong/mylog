import axiosInstance from '.';

import type {ImageUri, Marker} from '@/types/domain';

export type ResponseMarker = Marker & {images: ImageUri[]};

const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};

export {getMarkers};
