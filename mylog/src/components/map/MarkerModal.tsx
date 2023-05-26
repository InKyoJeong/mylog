import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import {CompoundOption} from '../@common/CompoundOption';
import Conditional from '../@common/Conditional';
import CustomMarker from '../@common/CustomMarker';
import useGetPost from '@/hooks/queries/useGetPost';
import useMarkerModalStore from '@/store/useMarkerModalStore';
import useThemeStore from '@/store/useThemeStore';
import {getDateWithSeparator} from '@/utils';
import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import type {ThemeMode} from '@/types';

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function MarkerModal() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const {markerId, isVisible, hideModal} = useMarkerModalStore();
  const {data: post, isLoading, isError} = useGetPost(markerId);

  if (isLoading || isError) {
    return <></>;
  }

  const handlePressGoButton = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id: post.id,
        },
        initial: false,
      },
    });

    hideModal();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideModal}>
      <CompoundOption.Background dimmed={false}>
        <CompoundOption.Card>
          <View style={styles.cardAlign}>
            <View style={styles.infoAlign}>
              <Conditional condition={post.images.length > 0}>
                <View style={styles.imageContainer}>
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
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker
                    size="small"
                    borderColor={colors[theme].GRAY_200}
                    innerColor={colors[theme].WHITE}
                  />
                </View>
              </Conditional>

              <View style={styles.markerInfoContainer}>
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
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>

            <Pressable style={styles.nextButton} onPress={handlePressGoButton}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color={colors[theme].BLACK}
              />
            </Pressable>
          </View>
        </CompoundOption.Card>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    cardAlign: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 35,
      borderWidth: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    infoAlign: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    markerInfoContainer: {
      width: Dimensions.get('screen').width / 2,
      marginLeft: 15,
      gap: 5,
    },
    addressContainer: {
      gap: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 10,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 15,
      fontWeight: 'bold',
    },
    dateText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors[theme].PINK_700,
    },
    nextButton: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

export default MarkerModal;
