import {useState} from 'react';
import {Alert, LayoutAnimation} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import useSnackbarStore from '@/store/useSnackbarStore';
import useMutateImages from './queries/useMutateImages';
import {captureException, getFormDataImages} from '@/utils';
import {numbers, alerts, errorMessages} from '@/constants';
import type {ImageUri} from '@/types';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode: 'multiple' | 'single';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages = [],
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const snackbar = useSnackbarStore();
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > numbers.MAX_UPLOADER_MULTIPLE_IMAGE) {
      Alert.alert(
        alerts.EXCEED_MULTIPLE_IMAGE_COUNT.TITLE,
        alerts.EXCEED_MULTIPLE_IMAGE_COUNT.DESCRIPTION,
      );
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const replaceImageUris = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert(
        alerts.EXCEED_SINGLE_IMAGE_COUNT.TITLE,
        alerts.EXCEED_SINGLE_IMAGE_COUNT.DESCRIPTION,
      );
      return;
    }

    setImageUris([...uris.map(uri => ({uri}))]);
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
      maxFiles: mode === 'multiple' ? numbers.MAX_UPLOADER_MULTIPLE_IMAGE : 1,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        uploadImages.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUris(data),
          onSettled: () => onSettled && onSettled(),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          snackbar.show(errorMessages.CANNOT_ACCESS_PHOTO);
          captureException(error);
        }
      });
  };

  return {
    imageUris,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
    handleChange,
    isUploading: uploadImages.isLoading,
  };
}

export default useImagePicker;
