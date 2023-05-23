import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import {CompoundModal} from '../@common/CompoundModal';
import {usePostQuery} from '@/hooks/queries/usePost';
import useMarkerStore from '@/store/useMarkerStore';
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
  const {markerId, isVisible, hideModal} = useMarkerStore();
  const {data: post, isLoading, isError} = usePostQuery(markerId);

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
    <CompoundModal isVisible={isVisible} hideModal={hideModal}>
      <CompoundModal.CardBackground>
        <CompoundModal.Card>
          <View style={styles.cardAlign}>
            <View style={styles.infoAlign}>
              <CompoundModal.CardImage imageUris={post.images} />
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
            <CompoundModal.GoNextButton onPress={handlePressGoButton} />
          </View>
        </CompoundModal.Card>
      </CompoundModal.CardBackground>
    </CompoundModal>
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
  });

export default MarkerModal;
