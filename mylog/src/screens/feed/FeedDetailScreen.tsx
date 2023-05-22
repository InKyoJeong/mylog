import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
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

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import Conditional from '@/components/@common/Conditional';
import CustomMarker from '@/components/@common/CustomMarker';
import CustomButton from '@/components/@common/CustomButton';
import CustomBottomTab from '@/components/@common/CustomBottomTab';
import FeedDetailModal from '@/components/feed/FeedDetailModal';
import PreviewImageList from '@/components/post/PreviewImageList';
import FeedDetailHeader from '@/components/feed/FeedDetailHeader';
import {useUpdateFavoritePost} from '@/hooks/queries/useFavoritePost';
import useModal from '@/hooks/useModal';
import {useGetPost} from '@/hooks/queries/usePost';
import useAuth from '@/hooks/queries/useAuth';
import useLocationStore from '@/store/useLocationStore';
import useDetailPostStore from '@/store/useDetailPostStore';
import useSnackbarStore from '@/store/useSnackbarStore';
import useThemeStore from '@/store/useThemeStore';
import {getDateLocaleFormat} from '@/utils/date';
import {
  numbers,
  colorHex,
  colors,
  successMessages,
  feedNavigations,
  mainNavigations,
  mapNavigations,
  settingNavigations,
} from '@/constants';
import type {ThemeMode} from '@/types';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {id} = route.params;
  const {data: post, isLoading, isError} = useGetPost(id);
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const favoriteMutation = useUpdateFavoritePost();
  const insets = useSafeAreaInsets();
  const optionModal = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailPostStore();
  const snackbar = useSnackbarStore();

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

  const handlePressCategory = () => {
    navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.EDIT_CATEGORY,
      initial: false,
    });
  };

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  const handlePressFavorite = () => {
    favoriteMutation.mutate(post.id, {
      onSuccess: () =>
        !post.isFavorite && snackbar.show(successMessages.SUCCESS_ADD_BOOKMARK),
    });
  };

  return (
    <>
      <View style={styles.relativeContainer}>
        <FeedDetailHeader
          isScrolled={isScrolled}
          onPressLeft={() => navigation.goBack()}
          onPressRight={optionModal.show}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={100}
          style={
            insets.bottom
              ? {marginBottom: insets.bottom + 50}
              : styles.scrollNoInsets
          }>
          <Conditional condition={post.images.length > 0}>
            <View key={post.id} style={styles.coverImageContainer}>
              <Image
                source={{
                  uri: `${Config.BASE_URL}/${post.images[0]?.uri}`,
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
                borderColor={colors[theme].GRAY_300}
                innerColor={colors[theme].GRAY_300}
              />
            </View>
          </Conditional>

          <View style={styles.contentsContainer}>
            <View style={styles.addressContainer}>
              <Octicons
                name="location"
                size={10}
                color={colors[theme].GRAY_500}
              />
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
                  <Text style={styles.infoColumnKeyText}>방문날짜</Text>
                  <Text style={styles.infoColumnValueText}>
                    {getDateLocaleFormat(post.date)}
                  </Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoColumnKeyText}>평점</Text>
                  <Text style={styles.infoColumnValueText}>{post.score}점</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoColumnKeyText}>마커색상</Text>
                  <View
                    style={[
                      styles.markerColor,
                      {backgroundColor: colorHex(theme)[post.color]},
                    ]}
                  />
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoColumnKeyText}>카테고리</Text>
                  <Conditional condition={!!categories?.[post.color]}>
                    <Text style={styles.infoColumnValueText}>
                      {categories?.[post.color]}
                    </Text>
                  </Conditional>

                  <Conditional condition={!categories?.[post.color]}>
                    <Pressable
                      style={styles.emptyCategoryContainer}
                      onPress={handlePressCategory}>
                      <Text style={styles.infoColumnKeyText}>미설정</Text>
                    </Pressable>
                  </Conditional>
                </View>
              </View>
            </View>
            <Text style={styles.descriptionText}>{post.description}</Text>
          </View>

          <Conditional condition={post.images.length > 0}>
            <View style={styles.imageContentsContainer}>
              <PreviewImageList imageUris={post.images} />
            </View>
          </Conditional>
        </ScrollView>
      </View>

      <CustomBottomTab>
        <View
          style={[
            styles.tabContainer,
            insets.bottom === 0 && styles.tabContainerNoInsets,
          ]}>
          <Pressable
            style={({pressed}) => [
              pressed && styles.bookmarkPressedContainer,
              styles.bookmarkContainer,
            ]}
            onPress={handlePressFavorite}>
            <Octicons
              name="star-fill"
              size={30}
              color={
                post.isFavorite
                  ? colors[theme].YELLOW_500
                  : colors[theme].GRAY_100
              }
            />
          </Pressable>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={handlePressLocation}
          />
        </View>
      </CustomBottomTab>

      <FeedDetailModal
        isVisible={optionModal.isVisible}
        hideOption={optionModal.hide}
      />
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    relativeContainer: {
      position: 'relative',
    },
    scrollNoInsets: {
      marginBottom: 65,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    contentsContainer: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: colors[theme].WHITE,
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
    infoColumnKeyText: {
      color: colors[theme].BLACK,
    },
    infoColumnValueText: {
      color: colors[theme].PINK_700,
    },
    markerColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    emptyCategoryContainer: {
      backgroundColor: colors[theme].GRAY_300,
      paddingHorizontal: 2,
      paddingVertical: 2,
      borderRadius: 2,
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
      backgroundColor: colors[theme].GRAY_200,
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
    },
    addressContainer: {
      gap: 5,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    descriptionText: {
      color: colors[theme].BLACK,
      lineHeight: 25,
      fontSize: 16,
    },
    imageContentsContainer: {
      paddingVertical: 15,
      backgroundColor: colors[theme].WHITE,
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
    tabContainerNoInsets: {
      marginBottom: 10,
    },
    bookmarkContainer: {
      backgroundColor: colors[theme].PINK_700,
      height: '100%',
      paddingHorizontal: 5,
      borderRadius: 3,
      justifyContent: 'center',
    },
    bookmarkPressedContainer: {
      opacity: 0.5,
    },
  });

export default FeedDetailScreen;
