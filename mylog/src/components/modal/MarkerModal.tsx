import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import useMarkerStore from '@/store/useMarkerStore';
import {useGetMarker} from '@/hooks/queries/useMarker';
import {CompoundModal} from './CompoundModal';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';

function MarkerModal() {
  const {markerId, isVisible, hideModal} = useMarkerStore();
  const {data: marker, isLoading, isError} = useGetMarker(markerId);

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideModal}>
      <CompoundModal.CardBackground>
        <CompoundModal.Card>
          <View style={styles.cardAlign}>
            <View style={styles.infoAlign}>
              <CompoundModal.CardImage imageUris={marker.images} />
              <View style={styles.markerInfoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
                  <Text
                    style={styles.addressText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {marker.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{marker.title}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(marker.date, '.')}
                </Text>
              </View>
            </View>
            <CompoundModal.GoNextButton onPress={() => {}} />
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
