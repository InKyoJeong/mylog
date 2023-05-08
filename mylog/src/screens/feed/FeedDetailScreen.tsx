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
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

import Conditional from '@/components/common/Conditional';
import CustomMarker from '@/components/common/CustomMarker';
import CustomButton from '@/components/common/CustomButton';
import FeedDetailStickyHeader from '@/components/FeedDetailHeader';
import {useGetPost} from '@/hooks/queries/usePost';
import {getDateLocaleFormat} from '@/utils/date';
import {feedNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.FEED_DETAIL
>;

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
  GRAY: colors.GRAY_200,
  PINK: colors.PINK_700,
};

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);
  const {data: post, isLoading, isError} = useGetPost(id);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrolledY = offsetY > 100;

    setIsScrolled(isScrolledY);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (isLoading || isError) {
    return <></>;
  }

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
          <View key={post.id} style={styles.imageContainer}>
            <Image
              source={{
                uri: `http://192.168.0.55:3030/${post.images[0]?.uri}`,
              }}
              style={styles.image}
            />
          </View>
        </Conditional>
        <Conditional condition={post.images.length === 0}>
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <CustomMarker
              size="medium"
              borderColor={colors.GRAY_300}
              innerColor={colors.GRAY_300}
            />
          </View>
        </Conditional>

        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: colors.WHITE,
            marginBottom: 10,
          }}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors.GRAY_500} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{post.title}</Text>

          <View style={{marginVertical: 20, gap: 8}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>방문날짜</Text>
                <Text style={{color: colors.PINK_700}}>
                  {getDateLocaleFormat(post.date)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>평점</Text>
                <Text style={{color: colors.PINK_700}}>{post.score}점</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>마커색상</Text>
                <View
                  style={{
                    backgroundColor: colorHex[post.color],
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text>태그</Text>
                <Text style={{color: colors.PINK_700}}>식당</Text>
              </View>
            </View>
          </View>

          <Text>{post.description}</Text>
        </View>

        <Conditional condition={post.images.length > 0}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: colors.WHITE,
              marginBottom: 10 + insets.bottom + 15 + 40,
              // 15: 버튼위 패딩 40: 버튼영역
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row', gap: 6}}>
                {post.images.map(({uri}, index) => (
                  <View key={index} style={{width: 60, height: 60}}>
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

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingTop: 15,
          paddingBottom: insets.bottom,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          alignItems: 'flex-end',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View
            style={{
              backgroundColor: colors.PINK_700,
              height: '100%',
              paddingHorizontal: 5,
              borderRadius: 3,
              justifyContent: 'center',
            }}>
            <Octicons name="star-fill" size={30} color={colors.GRAY_100} />
          </View>
          <CustomButton label="위치보기" size="medium" variant="filled" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
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
});

export default FeedDetailScreen;
