import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  LayoutAnimation,
} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import Config from 'react-native-config';

import PreviewImageOption from './PreviewImageOption';
import useImageUriStore from '@/store/useImageUriStore';

function PreviewImageList() {
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

              <PreviewImageOption
                name="close"
                style={styles.cancelButton}
                onPress={() => deleteImageUri(uri)}
              />
              {index > 0 && (
                <PreviewImageOption
                  name="arrow-back-outline"
                  style={styles.moveLeftButton}
                  onPress={() => changeOrder(index, index - 1)}
                />
              )}
              {index < imageUris.length - 1 && (
                <PreviewImageOption
                  style={styles.moveRightButton}
                  onPress={() => changeOrder(index, index + 1)}
                  name="arrow-forward-outline"
                />
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
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;
