import React, {useState} from 'react';
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

import {useUploadMarkerImages} from '@/hooks/queries/useMarker';
import useImageUriStore from '@/store/useImageUriStore';
import {getFormDataImages, getPreviewImages} from '@/utils/image';
import {colors} from '@/constants/colors';

function InputImagesViewer() {
  const [previews, setPreviews] = useState<{uri: string}[]>([]);
  const {setImageUris} = useImageUriStore();
  const imageMutation = useUploadMarkerImages();

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    }).then(images => {
      const formData = getFormDataImages(images, 'images');
      const previewImages = getPreviewImages(images);

      imageMutation.mutate(formData, {
        onSuccess: data => {
          setPreviews(previewImages);
          setImageUris(data);
        },
      });
    });
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

        {previews.map(preview => {
          return (
            <View key={preview.uri} style={styles.imageContainer}>
              <Image style={styles.image} source={preview} />
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
});

export default InputImagesViewer;
