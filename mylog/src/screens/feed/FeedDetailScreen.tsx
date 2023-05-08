import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import Conditional from '@/components/common/Conditional';
import CustomMarker from '@/components/common/CustomMarker';
import CustomButton from '@/components/common/CustomButton';
import FeedDetailStickyHeader from '@/components/FeedDetailHeader';
import CustomBottomTab from '@/components/common/CustomBottomTab';
import useLocationStore from '@/store/useLocationStore';
import {useGetPost} from '@/hooks/queries/usePost';
import {getDateLocaleFormat} from '@/utils/date';
import {feedNavigations, mapNavigations} from '@/constants/navigations';
import {colorHex, colors} from '@/constants/colors';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MapStackParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);
  const {data: post, isLoading, isError} = useGetPost(id);
  const {setLocation} = useLocationStore();

  if (isLoading || isError) {
    return <></>;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrolledY = offsetY > 100;

    setIsScrolled(isScrolledY);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressLocation = () => {
    setLocation({latitude: post.latitude, longitude: post.longitude});
    navigation.navigate(mapNavigations.MAP_HOME);
  };

  return (
    <>
      <FeedDetailStickyHeader
        isScrolled={isScrolled}
        onPressLeft={handleGoBack}
        onPressRight={() => {}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}>
        <Conditional condition={post.images.length > 0}>
          <View key={post.id} style={styles.coverImageContainer}>
            <Image
              source={{
                uri: `http://192.168.0.55:3030/${post.images[0]?.uri}`,
              }}
              style={styles.image}
            />
          </View>
        </Conditional>
        <Conditional condition={post.images.length === 0}>
          <View
            style={[
              styles.coverImageContainer,
              styles.emptyCoverImageContainer,
            ]}>
            <CustomMarker
              size="medium"
              borderColor={colors.GRAY_300}
              innerColor={colors.GRAY_300}
            />
          </View>
        </Conditional>

        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors.GRAY_500} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text>방문날짜</Text>
                <Text style={{color: colors.PINK_700}}>
                  {getDateLocaleFormat(post.date)}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text>평점</Text>
                <Text style={{color: colors.PINK_700}}>{post.score}점</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text>마커색상</Text>
                <View
                  style={[
                    styles.markerColor,
                    {backgroundColor: colorHex[post.color]},
                  ]}
                />
              </View>
              <View style={styles.infoColumn}>
                <Text>태그</Text>
                <Text style={{color: colors.PINK_700}}>식당</Text>
              </View>
            </View>
          </View>
          <Text>{post.description}</Text>
        </View>

        <Conditional condition={post.images.length > 0}>
          <View
            style={[
              styles.imageContentsContainer,
              {
                marginBottom: 10 + insets.bottom + 15 + 40, // 15:버튼 paddingTop, 40:버튼 height
              },
            ]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imageScrollContainer}>
                {post.images.map(({uri}, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{uri: `http://192.168.0.55:3030/${uri}`}}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </Conditional>
      </ScrollView>

      <CustomBottomTab>
        <View style={styles.tabContainer}>
          <View style={styles.bookmarkContainer}>
            <Octicons name="star-fill" size={30} color={colors.GRAY_100} />
          </View>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={handlePressLocation}
          />
        </View>
      </CustomBottomTab>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  coverImageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyCoverImageContainer: {
    height: Dimensions.get('screen').width / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  imageScrollContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bookmarkContainer: {
    backgroundColor: colors.PINK_700,
    height: '100%',
    paddingHorizontal: 5,
    borderRadius: 3,
    justifyContent: 'center',
  },
});

export default FeedDetailScreen;
