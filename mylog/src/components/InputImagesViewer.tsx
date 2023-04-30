import React from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';

import InputImage from './InputImage';

function InputImagesViewer() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <InputImage />
        <View style={styles.imageContainer}>
          <Image
            // source={uri ? {uri} : require('@/assets/modal-default.png')}
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
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});

export default InputImagesViewer;
