import {create} from 'zustand';

interface ImageUriState {
  imageUris: {uri: string}[];
  addImageUris: (uris: string[]) => void;
  deleteImageUri: (uri: string) => void;
  clearImageUris: () => void;
}

const useImageUriStore = create<ImageUriState>(set => ({
  imageUris: [],
  addImageUris: (uris: string[]) => {
    const newImageUris = uris.map(uri => ({uri}));

    set(state => ({
      imageUris: [...state.imageUris, ...newImageUris],
    }));
  },
  deleteImageUri: (uri: string) => {
    set(state => ({
      imageUris: state.imageUris.filter(image => image.uri !== uri),
    }));
  },
  clearImageUris: () => {
    set({imageUris: []});
  },
}));

export default useImageUriStore;
