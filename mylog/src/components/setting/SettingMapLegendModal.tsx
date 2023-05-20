import React from 'react';

import {CompoundModal} from '../@common/CompoundModal';
import useLegendStorage from '@/hooks/useLegendStorage';

interface SettingMapLegendModalProps {
  isVisible: boolean;
  hideOption: () => void;
}

function SettingMapLegendModal({
  isVisible,
  hideOption,
}: SettingMapLegendModalProps) {
  const legendStorage = useLegendStorage();

  const handlePressShow = () => {
    legendStorage.set(true);
    hideOption();
  };

  const handlePressHide = () => {
    legendStorage.set(false);
    hideOption();
  };

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton
            onPress={handlePressShow}
            isChecked={legendStorage.isVisible}>
            표시하기
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton
            onPress={handlePressHide}
            isChecked={!legendStorage.isVisible}>
            숨기기
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>

        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={hideOption}>
            취소
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

export default SettingMapLegendModal;
