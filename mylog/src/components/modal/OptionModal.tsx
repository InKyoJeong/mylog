import React from 'react';
import {StyleSheet, View} from 'react-native';

import {CompoundModal} from './CompoundModal';
import useOptionStore from '@/store/useOptionStore';
import {colors} from '@/constants/colors';

function OptionModal() {
  const {isVisible, hideOption} = useOptionStore();

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <View style={styles.container}>
          <CompoundModal.OptionButtonList>
            <CompoundModal.OptionButton onPress={() => {}} isDanger>
              {/* 삭제하기 */}
            </CompoundModal.OptionButton>
            <View style={styles.border} />
            <CompoundModal.OptionButton onPress={() => {}}>
              {/* 수정하기 */}
            </CompoundModal.OptionButton>
          </CompoundModal.OptionButtonList>

          <CompoundModal.OptionButtonList>
            <CompoundModal.OptionButton onPress={hideOption}>
              {/* 취소하기 */}
            </CompoundModal.OptionButton>
          </CompoundModal.OptionButtonList>
        </View>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  border: {
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: 1,
  },
});

export default OptionModal;
