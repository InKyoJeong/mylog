import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useGetPost} from '@/hooks/queries/usePost';
import {feedNavigations} from '@/constants/navigations';
import Conditional from '@/components/common/Conditional';
import CustomMarker from '@/components/common/CustomMarker';
import {colors} from '@/constants/colors';
import CustomButton from '@/components/common/CustomButton';
import {getDateLocaleFormat} from '@/utils/date';

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

function FeedDetailScreen({route}: FeedDetailScreenProps) {
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const [scrolled, setScrolled] = useState(false);
  const {data: post, isLoading, isError} = useGetPost(id);

  if (isLoading || isError) {
    return <></>;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrolled = offsetY > 100;

    setScrolled(isScrolled);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <>
      {!scrolled && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            marginTop: insets.top,
            paddingHorizontal: 20,
            paddingVertical: 5,
            zIndex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Octicons name="arrow-left" size={25} color={colors.BLACK} />
          <Ionicons name="ellipsis-vertical" size={20} color={colors.BLACK} />
        </View>
      )}
      {scrolled && (
        <SafeAreaView
          style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Octicons name="arrow-left" size={25} color={colors.BLACK} />
            <Ionicons name="ellipsis-vertical" size={20} color={colors.BLACK} />
          </View>
        </SafeAreaView>
      )}
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

        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: colors.WHITE,
            marginBottom: 10 + insets.bottom + 15 + 40,
            // 15:버튼위 패딩 40:버튼영역
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
