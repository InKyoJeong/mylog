import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import {useUploadImages} from '@/hooks/queries/useImage';
import useImageUriStore from '@/store/useImageUriStore';
import {getFormDataImages} from '@/utils/image';
import {colors} from '@/constants/colors';

function ImageUploader() {
  const {addImageUris} = useImageUriStore();
  const imageMutation = useUploadImages();

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        imageMutation.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(err => console.log('이미지 선택 취소', err));
  };

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={handleChange}>
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
});

export default ImageUploader;
