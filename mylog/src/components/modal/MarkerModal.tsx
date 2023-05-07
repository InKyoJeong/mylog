import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Octicons from 'react-native-vector-icons/Octicons';

import useMarkerStore from '@/store/useMarkerStore';
import {useGetPost} from '@/hooks/queries/usePost';
import {CompoundModal} from './CompoundModal';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants/navigations';
import {mainNavigations} from '@/constants/navigations';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.FEED]: undefined;
};

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  StackNavigationProp<FeedStackParamList>
>;

function MarkerModal() {
  const navigation = useNavigation<Navigation>();
  const {markerId, isVisible, hideModal} = useMarkerStore();
  const {data: post, isLoading, isError} = useGetPost(markerId);

  if (isLoading || isError) {
    return <></>;
  }

  const handlePressGoButton = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedNavigations.FEED_DETAIL,
      params: {
        id: post.id,
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
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
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

const styles = StyleSheet.create({
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
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
});

export default MarkerModal;
