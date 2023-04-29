import React from 'react';

import {CompoundModal} from './CompoundModal';
import useOptionStore from '@/store/useOptionStore';

function OptionModal() {
  const {isVisible, hideOption} = useOptionStore();

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={() => {}} isDanger>
            {/* 삭제하기 */}
          </CompoundModal.OptionButton>
          <CompoundModal.OptionBorder />
          <CompoundModal.OptionButton onPress={() => {}}>
            {/* 수정하기 */}
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>

        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={hideOption}>
            {/* 취소하기 */}
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

export default OptionModal;
