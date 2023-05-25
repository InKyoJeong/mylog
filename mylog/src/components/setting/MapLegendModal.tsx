import React from 'react';

import {CompoundModal} from '../@common/CompoundModal';
import useLegendStorage from '@/hooks/useLegendStorage';

interface MapLegendModalProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MapLegendModal({isVisible, hideOption}: MapLegendModalProps) {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };

  const handlePressHide = () => {
    set(false);
    hideOption();
  };

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.Background type="option">
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton
            onPress={handlePressShow}
            isChecked={isVisibleLegend}>
            표시하기
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton
            onPress={handlePressHide}
            isChecked={!isVisibleLegend}>
            숨기기
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>

        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={hideOption}>
            취소
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.Background>
    </CompoundModal>
  );
}

export default MapLegendModal;
