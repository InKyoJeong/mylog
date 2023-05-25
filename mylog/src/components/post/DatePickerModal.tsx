import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {CompoundModal} from '../@common/CompoundModal';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';

interface DatePickerModalProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerModal({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
}: DatePickerModalProps) {
  const {theme} = useThemeStore();

  return (
    <CompoundModal isVisible={isVisible} hideModal={() => {}}>
      <CompoundModal.Background type="option">
        <CompoundModal.OptionButtonList>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              textColor={colors[theme].BLACK}
              date={date}
              onDateChange={onChangeDate}
              locale="ko"
            />
          </View>
        </CompoundModal.OptionButtonList>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={onConfirmDate}>
            선택완료
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.Background>
    </CompoundModal>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
});

export default DatePickerModal;
