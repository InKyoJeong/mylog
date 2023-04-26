import React from 'react';
import {StyleSheet, View} from 'react-native';

import useMarkerStore from '@/store/useMarkerStore';
import {useGetMarker} from '@/hooks/queries/useMarker';
import {CompoundModal} from './CompoundModal';

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
              <CompoundModal.CardImage
                uri={'https://reactnative.dev/img/tiny_logo.png'}
              />
              <CompoundModal.MarkerInfo
                address={marker.address}
                title={marker.title}
                date="2023.04.26"
              />
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
});

export default MarkerModal;
