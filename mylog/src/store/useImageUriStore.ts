import {create} from 'zustand';

import type {ImageUri} from '@/types/api';

interface ImageUriState {
  imageUris: ImageUri[];
  setImageUris: (newImageUris: ImageUri[]) => void;
  deleteImageUri: (imageId: number) => void;
}

const useImageUriStore = create<ImageUriState>(set => ({
  imageUris: [],
  setImageUris: (newImageUris: ImageUri[]) => {
    set({imageUris: newImageUris});
  },
  deleteImageUri: (imageId: number) => {
    set(state => ({
      imageUris: state.imageUris.filter(image => image.id !== imageId),
    }));
  },
}));

export default useImageUriStore;
