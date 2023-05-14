import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import Conditional from '@/components/@common/Conditional';
import CustomMarker from '@/components/@common/CustomMarker';
import CustomButton from '@/components/@common/CustomButton';
import CustomBottomTab from '@/components/@common/CustomBottomTab';
import FeedDetailOptionModal from '@/components/feed/FeedDetailOptionModal';
import PreviewImageList from '@/components/post/PreviewImageList';
import FeedDetailHeader from '@/components/feed/FeedDetailHeader';
import useLocationStore from '@/store/useLocationStore';
import useDetailPostStore from '@/store/useDetailPostStore';
import useModal from '@/hooks/useModal';
import {useGetPost} from '@/hooks/queries/usePost';
import {getDateLocaleFormat} from '@/utils/date';
import {feedNavigations, mapNavigations} from '@/constants/navigations';
import {colorHex, colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MapStackParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const optionModal = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const {setLocation} = useLocationStore();
  const {setDetailPost} = useDetailPostStore();
  const {data: post, isLoading, isError} = useGetPost(id);

  useEffect(() => {
    post && setDetailPost(post);
  }, [post, setDetailPost]);

  if (isLoading || isError) {
    return <></>;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrolledY = offsetY > numbers.MIN_STICKY_HEADER_OFFSET;
    setIsScrolled(isScrolledY);
  };

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setLocation({latitude, longitude});
    navigation.navigate(mapNavigations.MAP_HOME);
  };

  return (
    <>
      <FeedDetailHeader
        isScrolled={isScrolled}
        onPressLeft={() => navigation.goBack()}
        onPressRight={optionModal.show}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
        style={{marginBottom: insets.bottom + 50}}>
        <Conditional condition={post.images.length > 0}>
          <View key={post.id} style={styles.coverImageContainer}>
            <Image
              source={{
                uri: `${Config.BACK_URL}/${post.images[0]?.uri}`,
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
                <Text>태그</Text>
                <Text style={{color: colors.PINK_700}}>식당</Text>
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>

        <Conditional condition={post.images.length > 0}>
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.images} showOption={false} />
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

      <FeedDetailOptionModal
        isVisible={optionModal.isVisible}
        hideOption={optionModal.hide}
      />
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
  descriptionText: {
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
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
