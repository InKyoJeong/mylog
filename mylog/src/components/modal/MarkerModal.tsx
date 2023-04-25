import React from 'react';

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
      <CompoundModal.DialogContainer>
        <CompoundModal.GoNextButton onPress={() => {}} />
        <CompoundModal.Scroll>
          <CompoundModal.MarkerInfo
            imageUrl={'https://reactnative.dev/img/tiny_logo.png'}
            date={'2023년 04월 26일'}
            title={marker.title}
          />
          <CompoundModal.Address>{marker.address}</CompoundModal.Address>
          <CompoundModal.Description>
            {marker.description}
          </CompoundModal.Description>
        </CompoundModal.Scroll>
      </CompoundModal.DialogContainer>
    </CompoundModal>
  );
}

export default MarkerModal;
