import React from 'react';
import {useColorScheme} from 'react-native';

import {CompoundModal} from '../@common/CompoundModal';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeModalProps {
  isVisible: boolean;
  hideOption: () => void;
}

function DarkModeModal({isVisible, hideOption}: DarkModeModalProps) {
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'light'}>
            라이트 모드
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값
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

export default DarkModeModal;
