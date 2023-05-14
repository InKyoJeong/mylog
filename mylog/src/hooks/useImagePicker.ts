import {useState} from 'react';
import {Alert, LayoutAnimation} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import useSnackbarStore from '@/store/useSnackbarStore';
import {getFormDataImages} from '@/utils/image';
import {useUploadImages} from './queries/useImage';
import {alerts, errorMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';
import type {ImageUri} from '@/types/domain';

function useImagePicker(initialImages: ImageUri[] = []) {
  const [imageUris, setImageUris] = useState(initialImages);
  const snackbar = useSnackbarStore();
  const imageMutation = useUploadImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > numbers.MAX_UPLOADER_IMAGE) {
      Alert.alert(
        alerts.EXCEED_IMAGE_COUNT.TITLE,
        alerts.EXCEED_IMAGE_COUNT.DESCRIPTION,
      );
      return;
    }

    setImageUris(prev => {
      return [...prev, ...uris.map(uri => ({uri}))];
    });
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: numbers.MAX_UPLOADER_IMAGE,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        imageMutation.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          snackbar.show(errorMessages.CANNOT_ACCESS_PHOTO);
        }
      });
  };

  return {
    imageUris,
    add: addImageUris,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
    handleChange,
  };
}

export default useImagePicker;
