import {create} from 'zustand';

interface ImageUriState {
  imageUris: string[];
  setImageUris: (newImageUris: string[]) => void;
  deleteImageUri: (uri: string) => void;
}

const useImageUriStore = create<ImageUriState>(set => ({
  imageUris: [],
  setImageUris: (newImageUris: string[]) => {
    set({imageUris: newImageUris});
  },
  deleteImageUri: (uri: string) => {
    set(state => ({
      imageUris: state.imageUris.filter(image => image !== uri),
    }));
  },
}));

export default useImageUriStore;
