import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ImageUri, ThemeMode} from '@/types';
import FastImage from 'react-native-fast-image';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [page, setPage] = useState(pressedIndex);
  const [initialIndex, setInitialIndex] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Octicons
          name="arrow-left"
          size={30}
          color={colors[theme].UNCHANGE_WHITE}
        />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <FastImage
              style={styles.image}
              source={{
                uri: `${item.uri}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={deviceWidth}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
        initialScrollIndex={initialIndex}
      />

      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, i) => (
          <View
            key={i}
            style={[styles.pageDot, i === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    backButton: {
      position: 'absolute',
      left: 20,
      zIndex: 1,
      backgroundColor: colors[theme].PINK_700,
      height: 40,
      width: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      width: 200,
      height: 200,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    pageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
    },
    pageDot: {
      margin: 4,
      backgroundColor: colors[theme].GRAY_200,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    currentPageDot: {
      backgroundColor: colors[theme].PINK_700,
    },
  });

export default ImageCarousel;
