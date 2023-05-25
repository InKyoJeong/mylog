import React from 'react';
import {ScrollView, StyleSheet, Image, View, Pressable} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';

import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import PreviewImageButton from './PreviewImageButton';
import Conditional from '../@common/Conditional';
import {feedNavigations} from '@/constants';
import type {ImageUri} from '@/types';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showDeleteButton?: boolean;
  showOrderButton?: boolean;
  zoomEnable?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showDeleteButton = false,
  showOrderButton = false,
  zoomEnable = false,
}: PreviewImageListProps) {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();

  const handlePressImage = (index: number) => {
    if (zoomEnable) {
      navigation.navigate(feedNavigations.IMAGE_ZOOM, {
        index,
      });
    }
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
              <Pressable onPress={() => handlePressImage(index)}>
                <Image
                  style={styles.image}
                  source={{uri: `${Config.BASE_URL}/${uri}`}}
                />
              </Pressable>

              <Conditional condition={showDeleteButton}>
                <PreviewImageButton
                  name="close"
                  style={styles.cancelButton}
                  onPress={() => onDelete && onDelete(uri)}
                />
              </Conditional>

              <Conditional condition={showOrderButton}>
                {index > 0 && (
                  <PreviewImageButton
                    name="arrow-back-outline"
                    style={styles.moveLeftButton}
                    onPress={() =>
                      onChangeOrder && onChangeOrder(index, index - 1)
                    }
                  />
                )}
                {index < imageUris.length - 1 && (
                  <PreviewImageButton
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
