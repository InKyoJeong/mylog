import React from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import Config from 'react-native-config';

import Conditional from '../@common/Conditional';
import PreviewImageOption from './PreviewImageOption';
import {ImageUri} from '@/types/domain';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showDeleteButton?: boolean;
  showOrderButton?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showDeleteButton = false,
  showOrderButton = false,
}: PreviewImageListProps) {
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
                source={{uri: `${Config.BASE_URL}/${uri}`}}
              />

              <Conditional condition={showDeleteButton}>
                <PreviewImageOption
                  name="close"
                  style={styles.cancelButton}
                  onPress={() => onDelete && onDelete(uri)}
                />
              </Conditional>

              <Conditional condition={showOrderButton}>
                {index > 0 && (
                  <PreviewImageOption
                    name="arrow-back-outline"
                    style={styles.moveLeftButton}
                    onPress={() =>
                      onChangeOrder && onChangeOrder(index, index - 1)
                    }
                  />
                )}
                {index < imageUris.length - 1 && (
                  <PreviewImageOption
                    style={styles.moveRightButton}
                    onPress={() =>
                      onChangeOrder && onChangeOrder(index, index + 1)
                    }
                    name="arrow-forward-outline"
                  />
                )}
              </Conditional>
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
