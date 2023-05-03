import React from 'react';
import {
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  Image,
  LayoutAnimation,
} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import useImageUriStore from '@/store/useImageUriStore';
import {colors} from '@/constants/colors';

function ImagesPreview() {
  const {imageUris, deleteImageUri, setImageUris} = useImageUriStore();

  const changeOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <Animated.View
              key={uri}
              style={styles.imageContainer}
              entering={FadeInRight}
              exiting={FadeOutLeft}>
              <Image
                style={styles.image}
                source={{uri: `${Config.BACK_URL}/${uri}`}}
              />

              <Pressable
                style={styles.cancelButton}
                onPress={() => deleteImageUri(uri)}>
                <Ionicons name="close" size={16} color={colors.WHITE} />
              </Pressable>
              {index > 0 && (
                <Pressable
                  style={styles.moveLeftButton}
                  onPress={() => changeOrder(index, index - 1)}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}
              {index < imageUris.length - 1 && (
                <Pressable
                  style={styles.moveRightButton}
                  onPress={() => changeOrder(index, index + 1)}>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cancelButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  moveLeftButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },

  moveRightButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
});

export default ImagesPreview;
