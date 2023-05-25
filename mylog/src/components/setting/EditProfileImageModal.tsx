import React from 'react';

import {CompoundModal} from '../@common/CompoundModal';

interface EditProfileImageModalProps {
  isVisible: boolean;
  hideOption: () => void;
  onChangeImage: () => void;
}

function EditProfileImageModal({
  isVisible,
  hideOption,
  onChangeImage,
}: EditProfileImageModalProps) {
  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.Background type="option">
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={onChangeImage}>
            앨범에서 사진선택
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

export default EditProfileImageModal;
