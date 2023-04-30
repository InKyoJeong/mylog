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

import {colors} from '@/constants/colors';
import {useUploadMarkerImages} from '@/hooks/queries/useMarker';

function InputImagesViewer() {
  const imageMutation = useUploadMarkerImages();

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      // includeBase64: true,
    }).then(images => {
      const formData = new FormData();

      images.forEach(img => {
        const file = {
          uri: img.path,
          type: img.mime,
          name: img.path.split('/').pop(),
        };

        console.log('images', file);
        formData.append('images', file);
      });

      console.log('formData', formData);

      imageMutation.mutate(formData, {
        onSuccess: data => console.log('success data', data),
      });
    });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable style={styles.imageInput} onPress={handleChange}>
          <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
          <Text style={styles.text}>사진 추가</Text>
        </Pressable>

        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/modal-default.png')}
            style={styles.image}
          />
        </View>
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
