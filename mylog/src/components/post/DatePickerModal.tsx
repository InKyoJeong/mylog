import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {CompoundModal} from '../@common/CompoundModal';
import {colors} from '@/constants/colors';

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
  return (
    <CompoundModal isVisible={isVisible} hideModal={() => {}}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              textColor={colors.BLACK}
              date={date}
              onDateChange={onChangeDate}
            />
          </View>
        </CompoundModal.OptionButtonList>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={onConfirmDate}>
            선택완료
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
});

export default DatePickerModal;
