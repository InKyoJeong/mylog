import React from 'react';

import {CompoundModal} from './CompoundModal';

interface FeedDetailOptionModalProps {
  isVisible: boolean;
  hideOption: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
}

function FeedDetailOptionModal({
  isVisible,
  hideOption,
  onPressDelete,
  onPressEdit,
}: FeedDetailOptionModalProps) {
  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={onPressDelete} isDanger>
            삭제하기
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton onPress={onPressEdit}>
            수정하기
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>

        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={hideOption}>
            취소하기
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

export default FeedDetailOptionModal;
