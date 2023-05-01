import {create} from 'zustand';
import {Alert} from 'react-native';

import {numbers} from '@/constants/numbers';
import {alerts} from '@/constants/messages';

interface ImageUriState {
  imageUris: {uri: string}[];
  addImageUris: (uris: string[]) => void;
  deleteImageUri: (uri: string) => void;
  clearImageUris: () => void;
}

const useImageUriStore = create<ImageUriState>((set, get) => ({
  imageUris: [],
  addImageUris: (uris: string[]) => {
    if (get().imageUris.length + uris.length > numbers.MAX_UPLOADER_IMAGE) {
      Alert.alert(
        alerts.EXCEED_IMAGE_COUNT.TITLE,
        alerts.EXCEED_IMAGE_COUNT.DESCRIPTION,
      );
      return;
    }

    set(state => ({
      imageUris: [...state.imageUris, ...uris.map(uri => ({uri}))],
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
