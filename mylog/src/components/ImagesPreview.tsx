import React from 'react';
import {Pressable, ScrollView, View, StyleSheet, Image} from 'react-native';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import useImageUriStore from '@/store/useImageUriStore';
import {colors} from '@/constants/colors';

function ImagesPreview() {
  const {imageUris, deleteImageUri} = useImageUriStore();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}) => {
          return (
            <Animated.View
              key={uri}
              style={styles.imageContainer}
              entering={SlideInRight}
              exiting={SlideOutLeft}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => deleteImageUri(uri)}>
                <Ionicons name="close" size={18} color={colors.WHITE} />
              </Pressable>
              <Image
                style={styles.image}
                source={{uri: `${Config.BACK_URL}/${uri}`}}
              />
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
    paddingHorizontal: 10,
    gap: 10,
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
});

export default ImagesPreview;
