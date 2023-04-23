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
        <CompoundModal.Scroll>
          <CompoundModal.Date>2023년 04월 24일</CompoundModal.Date>
          <CompoundModal.MarkerInfo
            imageUrl={'https://reactnative.dev/img/tiny_logo.png'}
            address="000-000 000길"
            title={marker.title}
          />
          <CompoundModal.Description>
            {marker.description}
          </CompoundModal.Description>
          <CompoundModal.GoNextButton onPress={() => {}} />
        </CompoundModal.Scroll>
      </CompoundModal.DialogContainer>
    </CompoundModal>
  );
}

export default MarkerModal;
