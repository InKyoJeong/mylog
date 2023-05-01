import React from 'react';
import {
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Config from 'react-native-config';

import {useUploadImages} from '@/hooks/queries/useImage';
import useImageUriStore from '@/store/useImageUriStore';
import {getFormDataImages} from '@/utils/image';
import {colors} from '@/constants/colors';

function InputImagesViewer() {
  const {imageUris, addImageUris, deleteImageUri} = useImageUriStore();
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable
          style={({pressed}) => [
            pressed && styles.imageInputPressed,
            styles.imageInput,
          ]}
          onPress={handleChange}>
          <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
          <Text style={styles.text}>사진 추가</Text>
        </Pressable>

        {imageUris.map(({uri}) => {
          return (
            <View key={uri} style={styles.imageContainer}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => deleteImageUri(uri)}>
                <Ionicons name="close-circle" size={20} color={colors.BLACK} />
              </Pressable>

              <Image
                style={styles.image}
                source={{uri: `${Config.BACK_URL}/${uri}`}}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  imageInput: {
    borderWidth: 2,
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
  text: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cancelBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    zIndex: 10,
  },
});

export default InputImagesViewer;
